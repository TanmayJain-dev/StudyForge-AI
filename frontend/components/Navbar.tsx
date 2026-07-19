"use client";

import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-indigo-500" />
              <span className="text-white font-bold text-xl tracking-tight">StudyForge AI</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Features</Link>
              <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">How it works</Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
