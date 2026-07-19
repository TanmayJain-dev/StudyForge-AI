"use client";

import { motion } from 'motion/react';

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-center max-w-4xl mx-auto mb-16"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8">
        <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
        StudyForge AI Beta
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-display">
        Turn any document into <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          intelligent learning material
        </span>
      </h1>
      
      <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
        Upload your PDFs and let our AI generate beautiful notes, interactive flashcards, 
        practice quizzes, and rapid revision sheets in seconds.
      </p>
    </motion.div>
  );
}
