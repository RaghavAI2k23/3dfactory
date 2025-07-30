import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ServicesPage from '@/pages/ServicesPage';
import OrderNowPage from '@/pages/OrderNowPage';
import ContactPage from '@/pages/ContactPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import { CartProvider } from '@/context/CartContext';

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="min-h-screen bg-gray-900 text-white">
                    <Navbar />
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/shop" element={<ShopPage />} />
                            <Route path="/services" element={<ServicesPage />} />
                            <Route path="/order-now" element={<OrderNowPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                        </Routes>
                    </main>
                    <Toaster />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;