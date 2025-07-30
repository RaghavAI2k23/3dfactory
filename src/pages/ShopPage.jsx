import React from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';

const products = [
    {
        id: 1,
        name: 'Geometric Planter',
        description: 'A stylish, modern planter for your favorite succulents. Printed with eco-friendly PLA.',
        price: 24.99,
        imageDescription: 'A white 3D printed geometric planter on a wooden table'
    },
    {
        id: 2,
        name: 'Custom Lithophane',
        description: 'Turn your favorite photo into a magical 3D lithophane that reveals the image when lit from behind.',
        price: 39.99,
        imageDescription: 'A 3D printed lithophane showing a family portrait when held up to a light'
    },
    {
        id: 3,
        name: 'Articulated Dragon',
        description: 'A stunning, flexible dragon model that can be posed in various ways. A perfect desk toy.',
        price: 45.00,
        imageDescription: 'A colorful rainbow-colored 3D printed articulated dragon'
    },
    {
        id: 4,
        name: 'Engineering Prototype',
        description: 'A high-precision prototype part for mechanical engineering applications, printed in durable PETG.',
        price: 75.50,
        imageDescription: 'A complex mechanical gear part 3D printed in black material'
    },
];

const ShopPage = () => {
    return (
        <>
            <Helmet>
                <title>Shop - 3DFactory</title>
                <meta name="description" content="Browse our collection of high-quality 3D printed products." />
            </Helmet>
            <div className="container mx-auto p-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                >
                    Our Products
                </motion.h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence>
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
};

export default ShopPage;