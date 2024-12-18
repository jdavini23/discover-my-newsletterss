'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function HeroSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50"
    >
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Discover Your Perfect Newsletters
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Curate and explore the most relevant newsletters tailored to your interests.
        </p>
        
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Search newsletters..." 
              className="w-full px-4 py-3 pr-12 text-gray-900 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" 
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}