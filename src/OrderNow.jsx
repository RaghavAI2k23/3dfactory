import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const OrderNowPage = () => {
  const htmlContent = `
    <div class="main-container">
      <!-- Viewer Column -->
      <div class="viewer-wrapper">
        <div id="viewer">
          <div id="drop-hint">📤 Click here to upload or drag and drop your model to the canvas.</div>
        </div>
        <input type="file" id="upload" accept=".dxf,.stl" style="display:none;" />
        <button id="upload-model">UPLOAD MODEL</button>
        <div id="unit-toggle">
          File Unit:
          <label><input type="radio" name="unit" value="mm" checked> mm</label>
          <label><input type="radio" name="unit" value="inch"> inch</label>
        </div>
        <div id="scale-input">
          Scale: <input type="number" id="scale-value" value="100"> %
        </div>
        <div class="dimensions">
          L × W × H:
          <span class="dim-x">X: <span id="dim-x">0</span></span> ×
          <span class="dim-y">Y: <span id="dim-y">0</span></span> ×
          <span class="dim-z">Z: <span id="dim-z">0</span></span> cm
        </div>
        <div id="stats"></div>
      </div>
      <!-- Step Form Column -->
      <div class="sidebar">
        <div class="step-block active" id="step1">
          <div class="step-header"><span>1</span>Technology</div>
          <select id="technology">
            <option value="FDM">FDM - (Layer Height 0.1MM)</option>
            <option value="SLA">SLA - (High Detail)</option>
            <option value="SLS">SLS - (Nylon)</option>
          </select>
        </div>
        <div class="step-block" id="step2">
          <div class="step-header"><span>2</span>Material</div>
          <select id="material">
            <option value="PLA" data-cost="2">PLA</option>
            <option value="ABS" data-cost="2.5">ABS</option>
            <option value="Resin" data-cost="6">Resin</option>
            <option value="TPU" data-cost="4">TPU</option>
          </select>
        </div>
        <div class="step-block" id="step3">
          <div class="step-header"><span>3</span>Infill</div>
          <select id="infill">
            <option value="10">10%</option>
            <option value="20" selected>20%</option>
            <option value="30">30%</option>
            <option value="40">40%</option>
            <option value="50">50%</option>
            <option value="60">60%</option>
            <option value="70">70%</option>
            <option value="80">80%</option>
            <option value="90">90%</option>
            <option value="100">100%</option>
          </select>
          <button onclick="goToStep(4)">NEXT</button>
        </div>
        <div class="step-block" id="step4">
          <div class="step-header"><span>4</span>Finalize</div>
          <div id="estimate"></div>
        </div>
        <input type="text" id="user-name" placeholder="Your Name" required style="width:100%; padding:8px; margin-top:10px" />
        <textarea id="user-address" placeholder="Shipping Address" required style="width:100%; padding:8px; margin-top:10px"></textarea>
        <button
          id="send-details"
          style="margin-top: 10px; background: #007bff; color: white; padding: 10px; border: none; border-radius: 4px; cursor: pointer; width: 100%;"
          onclick="sendDetailsAndRedirect()"
        >
          📧 Send Details and Pay Now
        </button>
      </div>
    </div>
  `;

  const cssContent = `
    .main-container {
      display: flex;
      max-width: 1200px;
      margin: 30px auto;
      gap: 20px;
      padding: 0 15px;
    }
    .viewer-wrapper {
      flex: 1;
      padding: 20px;
      background: #fff;
      border: 1px solid #ccc;
    }
    #viewer {
      width: 100%;
      height: 400px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #fff;
      position: relative;
      overflow: hidden;
    }
    #viewer canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
    #drop-hint {
      position: absolute;
      bottom: 10px;
      width: 100%;
      text-align: center;
      font-size: 13px;
      color: #888;
    }
    #upload-model {
      margin-top: 10px;
      width: 100%;
      background: #2d89ef;
      color: white;
      border: none;
      padding: 10px;
      font-weight: bold;
      cursor: pointer;
      border-radius: 2px;
    }
    #unit-toggle {
      margin: 15px 0 10px;
    }
    #scale-input {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 10px;
    }
    #scale-input input {
      width: 50px;
    }
    .dimensions {
      font-size: 14px;
      margin-top: 5px;
    }
    .dimensions span {
      font-weight: bold;
    }
    .dim-x { color: red; }
    .dim-y { color: blue; }
    .dim-z { color: green; }
    #stats {
      margin-top: 10px;
      font-size: 13px;
    }
    .sidebar {
      width: 320px;
      background: #fff;
      border: 1px solid #ccc;
      padding: 15px;
    }
    .step-block {
      border-bottom: 1px solid #e0e0e0;
      padding: 10px 0;
    }
    .step-header {
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }
    .step-header span {
      color: #007bff;
      margin-right: 5px;
    }
    .step-block select,
    .step-block button {
      width: 100%;
      padding: 8px;
      font-size: 14px;
      margin-top: 5px;
    }
    .step-block button {
      background: #2d89ef;
      color: #fff;
      border: none;
      cursor: pointer;
      margin-top: 10px;
      border-radius: 4px;
    }
    .step-block.inactive {
      background-color: #f0f0f0;
      color: #888;
      pointer-events: none;
    }
  `;

  useEffect(() => {
    // This function will run after the component mounts
    const scriptUrls = [
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
      "https://checkout.razorpay.com/v1/checkout.js",
      "https://cdn.emailjs.com/sdk/3.2.0/email.min.js",
      "https://cdn.jsdelivr.net/npm/@supabase/supabase-js",
      "https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js",
      "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/STLLoader.js",
      "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js",
      "/dxf-parser.js", // Assuming these are in the public folder
      "/three-dxf.js"   // Assuming these are in the public folder
    ];

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false; // Load scripts in order
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      for (const url of scriptUrls) {
        await loadScript(url);
      }
      // After all external scripts are loaded, run the inline scripts
      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = `
        (function(){
          emailjs.init("THJrXQz70u8ine8Se");
        })();

        async function sendDetailsAndRedirect() {
          const userName = document.getElementById('user-name').value.trim();
          const userAddress = document.getElementById('user-address').value.trim();
          const fileInput = document.getElementById('upload');
          const file = fileInput.files[0];
          if (!userName || !userAddress || !file) {
            alert('Please fill in your name, address and upload an STL file.');
            return;
          }
          const supabase = window.supabase.createClient(
            'https://wwemyqtkamtewbpekoov.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3ZW15cXRrYW10ZXdicGVrb292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzNzAzNTksImV4cCI6MjA2NDk0NjM1OX0.ahOCulYKvDRb1wk7cdJJPOVcCvaiZ8Qg21AR_hIqvHc'
          );
          const path = \`stl-files/\${Date.now()}_\${file.name}\`;
          const { data: uploadData, error: uploadError } = await supabase.storage.from('uploads').upload(path, file, { contentType: 'application/sla' });
          const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(path);
          const tech = document.getElementById('technology').value;
          const materialEl = document.getElementById('material');
          const infill = parseFloat(document.getElementById('infill').value || 0);
          const costPerCm3 = parseFloat(materialEl.selectedOptions[0].dataset.cost || 0);
          const volumeUsed = modelVolume * (infill / 100);
          const totalCostValue = volumeUsed * costPerCm3;
          const dimX = document.getElementById('dim-x').textContent;
          const dimY = document.getElementById('dim-y').textContent;
          const dimZ = document.getElementById('dim-z').textContent;
          const volumeText = modelVolume.toFixed(2);
          const templateParams = {
            name: userName,
            address: userAddress,
            technology: tech,
            material: materialEl.value,
            infill: infill + "%",
            totalCost: totalCostValue.toFixed(2),
            dimension_x: dimX + " cm",
            dimension_y: dimY + " cm",
            dimension_z: dimZ + " cm",
            volume_cm3: volumeText + " cm³",
            stl_link: publicUrl
          };
          emailjs.send('service_4ugetqo', 'template_0upzagh', templateParams)
            .then(() => {
              alert('Details and STL uploaded successfully!');
              window.location.href = 'https://razorpay.me/@3Dfactory';
            })
            .catch(error => {
              alert('Failed to send email. Please try again.');
              console.error('EmailJS error:', error);
            });
        }

        let currentStep = 1;
        let modelVolume = 0;
        let loadedMesh = null;
        const viewerContainer = document.getElementById('viewer');
        let scene, camera, renderer, controls;
        if(viewerContainer && !viewerContainer.querySelector('canvas')) {
            initScene();
        }
        document.getElementById('upload-model').onclick = () => document.getElementById('upload').click();
        document.getElementById('upload').onchange = (e) => {
          if (e.target.files.length > 0) handleFile(e.target.files[0]);
        };
        if(viewerContainer) {
            viewerContainer.onclick = () => document.getElementById('upload').click();
        }
        function goToStep(n) {
          document.querySelectorAll('.step-block').forEach((block, idx) => {
            block.classList.toggle('active', idx + 1 === n);
          });
          currentStep = n;
          if (n === 4) showEstimate();
        }
        function showEstimate() {
          const tech = document.getElementById('technology').value;
          const materialEl = document.getElementById('material');
          const infill = parseFloat(document.getElementById('infill').value || 0);
          const costPerCm3 = parseFloat(materialEl.selectedOptions[0].dataset.cost || 0);
          const volumeUsed = modelVolume * (infill / 100);
          const totalCost = volumeUsed * costPerCm3;
          const estimateDiv = document.getElementById('estimate');
          estimateDiv.innerHTML = \`
            <p><strong>Technology:</strong> \${tech}</p>
            <p><strong>Material:</strong> \${materialEl.value}</p>
            <p><strong>Infill:</strong> \${infill}%</p>
            <p><strong>Volume Used:</strong> \${volumeUsed.toFixed(2)} cm³</p>
            <p><strong>Cost per cm³:</strong> ₹\${costPerCm3.toFixed(2)}</p>
            <hr>
            <p><strong>Total Estimated Cost:</strong> <span style="color:green">₹\${totalCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></p>
          \`;
        }
        function initScene() {
          scene = new THREE.Scene();
          camera = new THREE.PerspectiveCamera(75, viewerContainer.clientWidth / viewerContainer.clientHeight, 0.1, 1000);
          camera.position.set(0, 0, 100);
          renderer = new THREE.WebGLRenderer({ antialias: true });
          renderer.setSize(viewerContainer.clientWidth, viewerContainer.clientHeight);
          viewerContainer.appendChild(renderer.domElement);
          controls = new THREE.OrbitControls(camera, renderer.domElement);
          animate();
        }
        function animate() {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        }
        function clearScene() {
          while (scene.children.length > 0) scene.remove(scene.children[0]);
          document.getElementById('stats').innerHTML = '';
          loadedMesh = null;
        }
        function handleFile(file) {
          const ext = file.name.split('.').pop().toLowerCase();
          const reader = new FileReader();
          reader.onload = function (event) {
            clearScene();
            if (ext === 'stl') {
              const loader = new THREE.STLLoader();
              const geometry = loader.parse(event.target.result);
              const material = new THREE.MeshNormalMaterial({ flatShading: true });
              const mesh = new THREE.Mesh(geometry, material);
              loadedMesh = mesh;
              scene.add(mesh);
              applyScale(mesh);
              calculateSTLStats(geometry, file.name);
            } else if (ext === 'dxf') {
              const parser = new window.DxfParser();
              const dxf = parser.parseSync(event.target.result);
              new ThreeDxf.Viewer(dxf, viewerContainer, viewerContainer.clientWidth, viewerContainer.clientHeight);
            }
          };
          if (ext === 'stl') reader.readAsArrayBuffer(file);
          else reader.readAsText(file);
        }
        function applyScale(mesh) {
          const scaleValue = parseFloat(document.getElementById('scale-value').value || 100) / 100;
          mesh.scale.set(scaleValue, scaleValue, scaleValue);
          centerCamera(mesh);
        }
        function centerCamera(object) {
          const box = new THREE.Box3().setFromObject(object);
          const center = new THREE.Vector3();
          box.getCenter(center);
          controls.target.copy(center);
          camera.position.set(center.x, center.y, box.getSize(new THREE.Vector3()).length());
        }
        function calculateSTLStats(geometry) {
          geometry.computeBoundingBox();
          const position = geometry.attributes.position.array;
          let volume = 0;
          let min = new THREE.Vector3(+Infinity, +Infinity, +Infinity);
          let max = new THREE.Vector3(-Infinity, -Infinity, -Infinity);
          for (let i = 0; i < position.length; i += 9) {
            const a = new THREE.Vector3(position[i], position[i + 1], position[i + 2]);
            const b = new THREE.Vector3(position[i + 3], position[i + 4], position[i + 5]);
            const c = new THREE.Vector3(position[i + 6], position[i + 7], position[i + 8]);
            const ab = new THREE.Vector3().subVectors(b, a);
            const ac = new THREE.Vector3().subVectors(c, a);
            const cross = new THREE.Vector3().crossVectors(ab, ac);
            volume += a.dot(cross) / 6.0;
            [a, b, c].forEach(v => {
              min.min(v);
              max.max(v);
            });
          }
          volume = Math.abs(volume);
          modelVolume = volume / 1000;
          document.getElementById('dim-x').textContent = ((max.x - min.x) / 10).toFixed(2);
          document.getElementById('dim-y').textContent = ((max.y - min.y) / 10).toFixed(2);
          document.getElementById('dim-z').textContent = ((max.z - min.z) / 10).toFixed(2);
          document.getElementById('stats').innerHTML = \`Volume: \${volume.toFixed(2)} mm³\`;
        }
        // Make functions globally available for inline onclick handlers
        window.goToStep = goToStep;
        window.sendDetailsAndRedirect = sendDetailsAndRedirect;
      `;
      document.body.appendChild(inlineScript);
    };

    loadAllScripts();

    // Cleanup function to remove scripts when the component unmounts
    return () => {
      scriptUrls.forEach(url => {
        const scriptElement = document.querySelector(`script[src="${url}"]`);
        if (scriptElement) {
          document.body.removeChild(scriptElement);
        }
      });
      const inlineScript = document.querySelector('script[data-id="inline-script"]');
      if(inlineScript) {
          document.body.removeChild(inlineScript);
      }
    };
  }, []);

  return (
    <div>
      <Helmet>
        <title>DXF + STL Viewer</title>
        <style type="text/css">{cssContent}</style>
      </Helmet>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default OrderNowPage;
