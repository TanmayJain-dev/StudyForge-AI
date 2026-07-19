"use client";

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, RotateCw, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import LoadingState from '@/components/LoadingState';

interface Flashcard {
  front: string;
  back: string;
}

function FlashcardsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const type = searchParams.get('type') || 'medium';
  const filename = searchParams.get('filename') || 'Document';
  const content = searchParams.get("notes") || "";

  
  const [isGenerating, setIsGenerating] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>([]);

  useEffect(() => {
    async function loadFlashcards() {

      try {

        const response = await fetch(
          "http://localhost:8000/api/flashcards",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: content
            })
          }
        );

        const data = await response.json();

        const parsed = data.flashcards
          .split("## Flashcard")
          .filter(Boolean)
          .map((block: string) => {

            const q = block.match(/Q:\s*([\s\S]*?)A:/);
            const a = block.match(/A:\s*([\s\S]*)/);

            return {
              front: q ? q[1].trim() : "",
              back: a ? a[1].trim() : ""
            };

          });

        setCards(parsed);

      } catch (err) {
        console.error(err);
      }

      setIsGenerating(false);

    }

    loadFlashcards();

  }, []);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const toggleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() =>
            router.push(
              `/dashboard?filename=${encodeURIComponent(filename)}&notes=${encodeURIComponent(content)}`
            )
          }
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
              <Layers className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-semibold text-white">
              {type.charAt(0).toUpperCase() + type.slice(1)} Flashcards
            </h1>
          </div>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            Generated from <span className="text-gray-300 font-medium">{filename}</span>
          </p>
        </div>

        {isGenerating ? (
          <LoadingState message={`Extracting key concepts for ${type} flashcards...`} />
        ) : (
          <div className="flex flex-col items-center">
            {cards.length === 0 ? (
              <p className="text-gray-400">
                No flashcards generated.
              </p>
            ) : (
              <>
            {/* Progress indicator */}
            <div className="w-full max-w-2xl mb-8 flex items-center justify-between text-sm font-medium text-gray-400">
              <span>Card {currentIndex + 1} of {cards.length}</span>
              <div className="flex-1 mx-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
                />
              </div>
              <span>{Math.round(((currentIndex + 1) / cards.length) * 100)}%</span>
            </div>

            {/* Flashcard container */}
            <div className="w-full max-w-2xl aspect-[3/2] mb-8" style={{ perspective: '1000px' }}>
              <motion.div
                className="w-full h-full relative preserve-3d cursor-pointer"
                animate={{ rotateX: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
                onClick={toggleFlip}
              >
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden bg-black/40 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl hover:border-indigo-500/30 transition-colors">
                  <span className="absolute top-6 left-6 text-xs font-semibold tracking-wider text-indigo-400 uppercase">Question</span>
                  <h3 className="text-2xl md:text-3xl font-medium leading-tight px-4">
                    {cards[currentIndex].front}
                  </h3>
                  <div className="absolute bottom-6 text-sm text-gray-500 flex items-center gap-2">
                    <RotateCw className="w-4 h-4" /> Click to reveal
                  </div>
                </div>

                {/* Back */}
                <div 
                  className="absolute w-full h-full backface-hidden bg-indigo-900/20 border border-indigo-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl"
                  style={{ transform: 'rotateX(180deg)' }}
                >
                  <span className="absolute top-6 left-6 text-xs font-semibold tracking-wider text-emerald-400 uppercase">Answer</span>
                  <p className="text-xl md:text-2xl font-medium leading-relaxed px-4 text-gray-200">
                    {cards[currentIndex].back}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              <button 
                onClick={handlePrev}
                className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6 text-gray-300 group-hover:text-white" />
              </button>
              <button 
                onClick={toggleFlip}
                className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-medium transition-colors cursor-pointer"
              >
                Flip Card
              </button>
              <button 
                onClick={handleNext}
                className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer"
              >
                <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-white" />
              </button>
            </div>
            </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Flashcards() {
  return (
    <Suspense fallback={<LoadingState message="Loading flashcards..." />}>
      <FlashcardsContent />
    </Suspense>
  );
}
