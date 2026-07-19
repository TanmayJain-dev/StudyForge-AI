"use client";

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, Zap, Download, Copy, Check } from 'lucide-react';
import LoadingState from '@/components/LoadingState';

function RevisionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const type = searchParams.get('type') || '5min';
  const filename = searchParams.get('filename') || 'Document';
  const content = searchParams.get("notes") || "";
  
  const [isGenerating, setIsGenerating] = useState(true);
  const [copied, setCopied] = useState(false);
  const [revision, setRevision] = useState("");

  useEffect(() => {

    async function loadRevision(){

      try{

        const response = await fetch(
          "http://localhost:8000/api/revision",
          {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              content,
              type
            })
          }
        );


        const data = await response.json();

        setRevision(data.revision);


      }catch(error){

        console.error(error);

      }


      setIsGenerating(false);

    }


    loadRevision();

  }, []);

  const handleCopy = async () => {

  await navigator.clipboard.writeText(revision);

  setCopied(true);

  setTimeout(()=>{
    setCopied(false);
  },2000);

  };

  const getTitle = () => {
    if (type === '5min') return '5-Minute Rapid Revision';
    if (type === '15min') return '15-Minute Core Revision';
    return 'Full Revision Sheet';
  };

  return (
    <div className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.push(`/dashboard?filename=${encodeURIComponent(filename)}&notes=${encodeURIComponent(content)}`)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-amber-500/20 p-2 rounded-lg text-amber-400">
                <Zap className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-semibold text-white">
                {getTitle()}
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
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export PDF
            </button>
          </div>
        </div>

        {isGenerating ? (
          <LoadingState message={`Condensing material for ${type} revision...`} />
        ) : (
          <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          className="bg-black/40 border border-white/10 rounded-2xl p-8 shadow-xl"
          >

          <article className="
          prose 
          prose-invert 
          max-w-none
          whitespace-pre-wrap
          leading-8
          ">

          {revision}

          </article>

          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Revision() {
  return (
    <Suspense fallback={<LoadingState message="Loading revision material..." />}>
      <RevisionContent />
    </Suspense>
  );
}
