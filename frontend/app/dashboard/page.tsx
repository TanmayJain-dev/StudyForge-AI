"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { 
  CheckCircle2,
  BookOpen,
  Layers as CardsIcon,
  HelpCircle,
  Zap
} from 'lucide-react';
import DocumentCard from '@/components/DocumentCard';
import FeatureCard from '@/components/FeatureCard';
import LoadingState from '@/components/LoadingState';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const filename = searchParams.get('filename') || 'Uploaded Document.pdf';
  const sizeStr = searchParams.get('size');
  const size = sizeStr ? parseInt(sizeStr, 10) : 2500000;

  // Receive AI-generated content from upload response
  const notes = searchParams.get('notes') || "";

  const handleSelectOption = (mode: string, type: string) => {
    const params = new URLSearchParams({
      type,
      filename,
      notes: searchParams.get("notes") || "",
    });

    router.push(`/${mode}?${params.toString()}`);
  };

  return (
    <div className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-900/10 blur-[100px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6 text-emerald-400 bg-emerald-400/10 w-fit px-4 py-2 rounded-full border border-emerald-400/20">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium text-sm">
              Your document is ready
            </span>
          </div>

          <DocumentCard
            filename={filename}
            size={size}
            uploadDate="19 Jul 2026"
          />
        </motion.div>


        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2">
            Select an Action
          </h2>

          <p className="text-gray-400">
            Choose how you want to interact with this document.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <FeatureCard
            index={0}
            title="Smart Notes"
            description="Generate structured AI notes."
            icon={BookOpen}
            options={[
              { id: 'summary', label: 'Quick Summary' },
              { id: 'exam', label: 'Exam Notes' },
              { id: 'detailed', label: 'Detailed Notes' }
            ]}
            onSelectOption={(type) =>
              handleSelectOption('notes', type)
            }
          />


          <FeatureCard
            index={1}
            title="Flashcards"
            description="Create revision flashcards."
            icon={CardsIcon}
            options={[
              { id: 'easy', label: 'Easy' },
              { id: 'medium', label: 'Medium' },
              { id: 'hard', label: 'Hard' }
            ]}
            onSelectOption={(type) =>
              handleSelectOption('flashcards', type)
            }
          />


          <FeatureCard
            index={2}
            title="Practice Quiz"
            description="Generate questions."
            icon={HelpCircle}
            options={[
              { id: 'easy', label: 'Easy' },
              { id: 'medium', label: 'Medium' },
              { id: 'hard', label: 'Hard' }
            ]}
            onSelectOption={(type) =>
              handleSelectOption('quiz', type)
            }
          />


          <FeatureCard
            index={3}
            title="Flash Revision"
            description="Create rapid revision sheets."
            icon={Zap}
            options={[
              { id: '5min', label: '5 minute revision' },
              { id: '15min', label: '15 minute revision' },
              { id: 'full', label: 'Full revision' }
            ]}
            onSelectOption={(type) =>
              handleSelectOption('revision', type)
            }
          />

        </div>
      </div>
    </div>
  );
}


export default function Dashboard() {
  return (
    <Suspense fallback={<LoadingState message="Loading dashboard..." />}>
      <DashboardContent />
    </Suspense>
  );
}