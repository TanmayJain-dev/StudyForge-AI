"use client";

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, Download, Copy, Check, FileText } from 'lucide-react';
import LoadingState from '@/components/LoadingState';

function NotesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const type = searchParams.get('type') || 'summary';
  const filename = searchParams.get("filename") || "Document";
  const notes = searchParams.get("notes") || "No notes generated.";

  const [isGenerating, setIsGenerating] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsGenerating(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(notes);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleExportPDF = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/export/pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: filename,
            notes: notes,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("PDF export failed");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "StudyForge_Notes.pdf";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("Failed to export PDF");
    }
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() =>
            router.push(
              `/dashboard?filename=${encodeURIComponent(filename)}&notes=${encodeURIComponent(notes)}`
            )
          }
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
                <FileText className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-semibold text-white">
                {capitalize(type)} Notes
              </h1>
            </div>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Generated from <span className="text-gray-300 font-medium">{filename}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleCopy}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button 
              onClick={handleExportPDF}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>

        {isGenerating ? (
          <LoadingState message={`Analyzing document to generate ${type} notes...`} />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-64 shrink-0 order-2 lg:order-1"
            >
              <div className="sticky top-24 bg-white/5 border border-white/10 rounded-xl p-5 shadow-lg">
                <h3 className="font-medium text-white mb-4">Table of Contents</h3>
                <nav className="space-y-3">
                  <a href="#section-1" className="block text-sm text-indigo-400 font-medium">1. Core Concepts</a>
                  <a href="#section-2" className="block text-sm text-gray-400 hover:text-gray-200 transition-colors">2. Key Terminology</a>
                  <a href="#section-3" className="block text-sm text-gray-400 hover:text-gray-200 transition-colors pl-4">2.1 Advanced Definitions</a>
                  <a href="#section-4" className="block text-sm text-gray-400 hover:text-gray-200 transition-colors">3. Methodology</a>
                  <a href="#section-5" className="block text-sm text-gray-400 hover:text-gray-200 transition-colors">4. Summary & Conclusions</a>
                </nav>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 order-1 lg:order-2"
            >
              <div className="max-w-none bg-black/40 border border-white/10 rounded-2xl p-8 lg:p-12 shadow-xl">
                <article className="prose prose-invert max-w-none whitespace-pre-wrap leading-8">
                  {notes}
                </article>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Notes() {
  return (
    <Suspense fallback={<LoadingState message="Loading notes..." />}>
      <NotesContent />
    </Suspense>
  );
}
