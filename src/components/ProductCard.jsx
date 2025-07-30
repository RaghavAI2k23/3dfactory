import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { CartContext } from '@/context/CartContext';

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setQuantity(1); // Reset quantity after adding to cart
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm border border-gray-700 flex flex-col"
        >
            <div className="relative w-full h-60">
                <img 
                    className="w-full h-full object-cover"
                    alt={product.name}
                 src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
                <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 m-2 rounded-full text-sm font-bold">
                    ${product.price.toFixed(2)}
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 text-base mb-4 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-gray-300 font-semibold">Quantity:</p>
                    <div className="flex items-center gap-2 bg-gray-700 rounded-full">
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-bold">{quantity}</span>
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8" onClick={() => setQuantity(q => q + 1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <Button onClick={handleAddToCart} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold group">
                    Add to Cart <ShoppingCart className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                </Button>
            </div>
        </motion.div>
    );
};

export default ProductCard;