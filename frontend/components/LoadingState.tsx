"use client";

import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = 'Generating content...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full" />
        <div className="relative bg-black border border-white/10 p-4 rounded-full shadow-2xl">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
        </div>
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 font-medium"
      >
        {message}
      </motion.p>
    </div>
  );
}
