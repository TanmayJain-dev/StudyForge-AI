"use client";

import { motion } from 'motion/react';

interface DifficultySelectorProps {
  selected: string;
  onSelect: (difficulty: string) => void;
}

export default function DifficultySelector({ selected, onSelect }: DifficultySelectorProps) {
  const difficulties = [
    { id: 'easy', label: 'Easy' },
    { id: 'medium', label: 'Medium' },
    { id: 'hard', label: 'Hard' }
  ];

  return (
    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
      {difficulties.map((level) => (
        <button
          key={level.id}
          onClick={() => onSelect(level.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selected === level.id 
              ? 'bg-indigo-600 text-white shadow-lg' 
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          {level.label}
        </button>
      ))}
    </div>
  );
}
