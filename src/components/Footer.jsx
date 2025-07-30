
import React from 'react';
import { Link } from 'react-router-dom';
import { Box as Cube, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Cube className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">3DFactory</span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium 3D printing services and products. Bringing your ideas to life with cutting-edge technology and exceptional quality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-lg font-semibold mb-4 block">Quick Links</span>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/custom-tools" className="text-gray-400 hover:text-white transition-colors">Custom Tools</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <span className="text-lg font-semibold mb-4 block">Services</span>
            <ul className="space-y-2 text-gray-400">
              <li>Rapid Prototyping</li>
              <li>Custom 3D Printing</li>
              <li>CAD to Print</li>
              <li>Bulk Printing</li>
              <li>Design Consultation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <span className="text-lg font-semibold mb-4 block">Contact</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@3dfactory.in</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 3DFactory. All rights reserved. | 3dfactory.in
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
