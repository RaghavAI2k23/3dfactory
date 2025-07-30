import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const OrderNowPage = () => {
    return (
        <>
            <Helmet>
                <title>Order Now - 3DFactory</title>
                <meta name="description" content="Place a custom 3D printing order or use our interactive tools." />
            </Helmet>
            <div className="container mx-auto p-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                >
                    Order Now
                </motion.h1>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">Your Custom Code</h2>
                    <p className="text-gray-400 mb-4">
                        This is your dedicated page to add custom HTML, CSS, and JavaScript.
                        You can embed interactive tools, custom order forms, or anything else you can build!
                    </p>
                    <div className="bg-gray-900 p-4 rounded-md border-2 border-dashed border-gray-600 min-h-[300px] flex items-center justify-center">
                        <p className="text-gray-500 text-center">
                            Paste your custom HTML/JS/CSS code here in the future.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderNowPage;