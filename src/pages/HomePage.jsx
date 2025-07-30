import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { toast } = useToast();

    const handleNotImplemented = () => {
        toast({
            title: "🚧 Feature in Progress!",
            description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
            variant: "destructive"
        });
    };

    return (
        <>
            <Helmet>
                <title>3DFactory - 3D Printing Services & Products</title>
                <meta name="description" content="Welcome to 3DFactory, your one-stop shop for professional 3D printing services and high-quality 3D printed products." />
            </Helmet>
            <div className="bg-gray-900">
                <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-grid-purple-500/10"></div>
                    <div className="relative z-10 text-center p-8">
                        <motion.h1
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="text-5xl md:text-7xl font-extrabold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                        >
                            Welcome to 3DFactory
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
                        >
                            Your vision, materialized. We offer cutting-edge 3D printing services and a curated selection of innovative products.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link to="/shop">
                                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold group">
                                    Shop Now <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300" onClick={handleNotImplemented}>
                                Explore Services
                            </Button>
                        </motion.div>
                    </div>
                </div>

                <section className="py-20 px-4">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                            See Our Printers in Action
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                            Watch how we bring digital designs to life with precision and quality.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600"
                        >
                            <div className="text-center text-gray-500">
                                <PlayCircle className="mx-auto h-16 w-16 mb-4" />
                                <p className="text-xl font-semibold">Product Demo Video</p>
                                <p>Coming Soon!</p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default HomePage;