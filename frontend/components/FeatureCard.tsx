"use client";

import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface Option {
  id: string;
  label: string;
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  options: Option[];
  onSelectOption: (optionId: string) => void;
  index: number;
}

export default function FeatureCard({ title, description, icon: Icon, options, onSelectOption, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-white/5 p-3 rounded-xl group-hover:bg-indigo-500/20 group-hover:text-indigo-400 text-gray-300 transition-colors duration-300 shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>
      </div>
      
      <div className="mt-auto space-y-2 pt-4 border-t border-white/5 relative z-10">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectOption(option.id)}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between group/btn cursor-pointer"
          >
            <span>{option.label}</span>
            <span className="opacity-0 group-hover/btn:opacity-100 text-indigo-400 transition-opacity translate-x-[-10px] group-hover/btn:translate-x-0 duration-300">
              →
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
