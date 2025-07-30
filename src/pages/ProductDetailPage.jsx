
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ShoppingCart, Star, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Mock product data - in real app, fetch from API
  const product = {
    id: parseInt(id),
    name: "Modern Geometric Vase",
    category: "home-decor",
    price: 2499,
    rating: 4.8,
    reviews: 124,
    images: [
      "Modern geometric vase with intricate 3D printed patterns - front view",
      "Modern geometric vase with intricate 3D printed patterns - side view",
      "Modern geometric vase with intricate 3D printed patterns - top view"
    ],
    description: "Elegant geometric vase perfect for modern home decor. This stunning piece combines contemporary design with precision 3D printing technology.",
    features: [
      "Premium PLA+ material",
      "Waterproof coating",
      "Dishwasher safe",
      "Available in multiple colors",
      "Eco-friendly production"
    ],
    specifications: {
      "Material": "PLA+",
      "Dimensions": "20cm x 15cm x 15cm",
      "Weight": "350g",
      "Color Options": "White, Black, Gray, Blue",
      "Print Resolution": "0.2mm"
    },
    delivery: "2-3 business days",
    availability: "In Stock"
  };

  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "Absolutely beautiful! The quality is outstanding and it looks perfect in my living room.",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 4,
      comment: "Great product, fast delivery. Very happy with the purchase.",
      date: "2024-01-10"
    },
    {
      id: 3,
      name: "Anita Patel",
      rating: 5,
      comment: "Exceeded my expectations! The geometric design is stunning.",
      date: "2024-01-08"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{product.name} - 3DFactory</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-blue-600">Shop</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          <Link to="/shop" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <img  
                  alt={product.name}
                  className="w-full h-full object-cover"
                 src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
              </motion.div>
              
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img  
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                <p className="text-3xl font-bold text-gray-900 mb-6">
                  ₹{product.price.toLocaleString()}
                </p>

                <p className="text-gray-600 mb-6">{product.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - ₹{(product.price * quantity).toLocaleString()}
                </Button>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Fast Delivery</p>
                    <p className="text-sm text-gray-600">{product.delivery}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Quality Guarantee</p>
                    <p className="text-sm text-gray-600">Premium materials</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Easy Returns</p>
                    <p className="text-sm text-gray-600">7-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">{key}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-900">{review.name}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
