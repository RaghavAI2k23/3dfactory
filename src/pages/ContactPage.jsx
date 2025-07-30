
    import React from 'react';
    import { Helmet } from 'react-helmet';
    import { motion } from 'framer-motion';

    const ContactPage = () => {
        return (
            <>
                <Helmet>
                    <title>Contact Us - 3DFactory</title>
                    <meta name="description" content="Get in touch with 3DFactory." />
                </Helmet>
                <div className="container mx-auto p-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                    >
                        Contact Us
                    </motion.h1>
                    <div className="flex justify-center items-center h-64">
                        <p className="text-xl text-gray-400">Contact page coming soon!</p>
                    </div>
                </div>
            </>
        );
    };

    export default ContactPage;
  