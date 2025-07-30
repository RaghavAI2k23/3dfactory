import React, { createContext, useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { toast } = useToast();
    const [cart, setCart] = useState(() => {
        try {
            const localData = localStorage.getItem('cart');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Could not parse cart data from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity) => {
        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += quantity;
                return updatedCart;
            } else {
                return [...prevCart, { ...product, quantity }];
            }
        });
        toast({
            title: "✅ Item added to cart!",
            description: `${quantity} x ${product.name} has been added.`,
        });
    };

    const updateQuantity = (productId, quantity) => {
        setCart(prevCart => {
            return prevCart.map(item =>
                item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
            ).filter(item => item.quantity > 0);
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
        toast({
            title: "🗑️ Item removed",
            description: "The item has been removed from your cart.",
            variant: "destructive"
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};