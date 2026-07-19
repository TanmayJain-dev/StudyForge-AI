"use client";

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, HelpCircle, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import LoadingState from '@/components/LoadingState';

interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
}

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const type = searchParams.get('type') || 'medium';
  const filename = searchParams.get('filename') || 'Document';
  const content = searchParams.get("notes") || "";
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    async function loadQuiz() {

      try {

        const response = await fetch(
          "http://localhost:8000/api/quiz",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content,
            }),
          }
        );

        const data = await response.json();

        setQuestions(data.quiz);

      } catch (err) {
        console.error(err);
      }

      setIsGenerating(false);
    }

    loadQuiz();

  }, []);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    
    if (index === questions[currentQuestion].correct_answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => router.push(`/dashboard?filename=${encodeURIComponent(filename)}&notes=${encodeURIComponent(content)}`)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-semibold text-white">
              {type.charAt(0).toUpperCase() + type.slice(1)} Practice Quiz
            </h1>
          </div>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            Generated from <span className="text-gray-300 font-medium">{filename}</span>
          </p>
        </div>

        {isGenerating ? (
          <LoadingState message={`Crafting ${type} difficulty questions...`} />
        ) : isFinished ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/40 border border-white/10 rounded-3xl p-12 text-center shadow-xl"
          >
            <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-400">
              <span className="text-4xl font-bold">{score}/{questions.length}</span>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">Quiz Completed!</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              You scored {Math.round((score / questions.length) * 100)}%. 
              {score === questions.length ? ' Perfect score, well done!' : ' Keep practicing to improve your knowledge.'}
            </p>
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={restartQuiz}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 font-medium transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
              <button 
                onClick={() => router.push(`/dashboard?filename=${encodeURIComponent(filename)}&notes=${encodeURIComponent(content)}`)}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-medium transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </motion.div>
        ) : questions.length === 0 ? (

          <div className="text-center py-20">
            <p className="text-gray-400">
              Failed to generate quiz.
            </p>
          </div>

        ) : (
          <div className="bg-black/40 border border-white/10 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <span className="text-sm font-medium text-indigo-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-500">
                Score: {score}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-medium leading-tight mb-10 text-white">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-4 mb-10">
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === questions[currentQuestion].correct_answer;
                const showCorrect = isAnswered && isCorrect;
                const showWrong = isAnswered && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    disabled={isAnswered}
                    className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                      showCorrect 
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-100' 
                        : showWrong 
                          ? 'bg-red-500/10 border-red-500/50 text-red-100'
                          : isSelected 
                            ? 'bg-indigo-500/10 border-indigo-500 text-white' 
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <span className="text-lg">{option}</span>
                    {showCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                    {showWrong && <XCircle className="w-6 h-6 text-red-500" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="mb-8 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-4">
                <h4 className="font-semibold text-indigo-300 mb-2">
                  Explanation
                </h4>

                <p className="text-gray-300">
                  {questions[currentQuestion].explanation}
                </p>
              </div>
            )}

            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end pt-6 border-t border-white/10"
                >
                  <button 
                    onClick={handleNext}
                    className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-medium transition-colors cursor-pointer"
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Quiz() {
  return (
    <Suspense fallback={<LoadingState message="Loading quiz..." />}>
      <QuizContent />
    </Suspense>
  );
}
