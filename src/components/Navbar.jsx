import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Printer, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartContext } from '@/context/CartContext';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Services', path: '/services' },
    { name: 'Order Now', path: '/order-now' },
    { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const location = useLocation();
    const { cart } = useContext(CartContext);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center space-x-2">
                        <Printer className="h-8 w-8 text-purple-400" />
                        <span className="text-2xl font-bold text-white">3DFactory</span>
                    </Link>
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.path} className={`relative text-lg font-medium transition-colors duration-300 ${location.pathname === link.path ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'}`}>
                                {link.name}
                                {location.pathname === link.path && (
                                    <motion.div
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"
                                        layoutId="underline"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center">
                         <Link to="/cart">
                            <Button variant="ghost" size="icon" className="relative mr-4 text-gray-300 hover:text-purple-400 hover:bg-gray-800">
                                <ShoppingCart className="h-6 w-6" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
                                        {totalItems}
                                    </span>
                                )}
                            </Button>
                        </Link>
                        <div className="md:hidden">
                            <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" size="icon" className="text-gray-300 hover:text-purple-400 hover:bg-gray-800">
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${location.pathname === link.path ? 'bg-purple-900/50 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;