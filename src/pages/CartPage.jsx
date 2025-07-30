import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const CartPage = () => {
    const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
    const { toast } = useToast();

    const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        toast({
            title: "🚧 Feature in Progress!",
            description: "Checkout isn't implemented yet. You can request it next! 🚀",
            variant: "destructive"
        });
    };

    return (
        <>
            <Helmet>
                <title>Shopping Cart - 3DFactory</title>
                <meta name="description" content="View and manage items in your shopping cart." />
            </Helmet>
            <div className="container mx-auto p-4 md:p-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                >
                    Your Cart
                </motion.h1>

                {cart.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <ShoppingCart className="mx-auto h-24 w-24 text-gray-600 mb-4" />
                        <p className="text-2xl text-gray-400 mb-4">Your cart is empty.</p>
                        <Link to="/shop">
                            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">Start Shopping</Button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cart.map(item => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
                                        className="flex items-center bg-gray-800/50 p-4 rounded-lg border border-gray-700"
                                    >
                                        <img  className="w-24 h-24 rounded-md object-cover mr-4" alt={item.name} src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                                        <div className="flex-grow">
                                            <h2 className="text-lg font-bold">{item.name}</h2>
                                            <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-bold text-lg w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="ml-4 text-red-500 hover:text-red-400" onClick={() => removeFromCart(item.id)}>
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 sticky top-28">
                                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                                <div className="flex justify-between mb-2 text-gray-300">
                                    <span>Subtotal</span>
                                    <span>${totalCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-4 text-gray-300">
                                    <span>Shipping</span>
                                    <span>FREE</span>
                                </div>
                                <div className="border-t border-gray-700 my-4"></div>
                                <div className="flex justify-between font-bold text-xl mb-6">
                                    <span>Total</span>
                                    <span>${totalCost.toFixed(2)}</span>
                                </div>
                                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" onClick={handleCheckout}>
                                    Proceed to Checkout
                                </Button>
                                <Button variant="link" className="w-full mt-2 text-red-500" onClick={clearCart}>
                                    Clear Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPage;