"use client";

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UploadCardProps {
  onUpload: (file: File) => Promise<void>;
}

export default function UploadCard({ onUpload }: UploadCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (selectedFile: File) => {
    setError(null);
    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a valid PDF document.');
      return false;
    }
    if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB.');
      return false;
    }
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadSubmit = async () => {
    if (file) {
      setIsUploading(true);
      // Simulate network delay
      try {
        await onUpload(file);
      }
      finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-colors ${
              isDragging 
                ? 'border-indigo-500 bg-indigo-500/10' 
                : 'border-white/10 bg-black/40 hover:bg-white/5'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
            />
            
            <div className="bg-indigo-500/20 p-4 rounded-full mb-6 text-indigo-400">
              <UploadCloud className="w-8 h-8" />
            </div>
            
            <h3 className="text-xl font-semibold text-white mb-2">
              Upload your document
            </h3>
            <p className="text-gray-400 text-sm text-center mb-6">
              Drag and drop your PDF here, or click to browse. <br/>
              Maximum file size: 10MB.
            </p>
            
            <button className="bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Select File
            </button>

            {error && (
              <div className="absolute bottom-4 flex items-center gap-2 text-red-400 text-sm mt-4 bg-red-400/10 px-4 py-2 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="file-preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-white/10 bg-black/60 backdrop-blur-md rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-500/20 p-3 rounded-xl text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-medium line-clamp-1">{file.name}</h4>
                  <p className="text-gray-400 text-sm">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • PDF Document
                  </p>
                </div>
              </div>
              <button 
                onClick={handleRemoveFile}
                disabled={isUploading}
                className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={handleUploadSubmit}
              disabled={isUploading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Document...
                </>
              ) : (
                'Generate AI Materials'
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
