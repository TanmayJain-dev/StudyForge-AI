"use client";

import { FileText, Calendar, Layers } from "lucide-react";

interface DocumentCardProps {
  filename: string;
  size: number;
  uploadDate: string;
}

export default function DocumentCard({
  filename,
  size,
  uploadDate,
}: DocumentCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-500/20 p-4 rounded-xl text-indigo-400 shrink-0">
            <FileText className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">
              {filename}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                ~24 pages
              </span>

              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                {(size / (1024 * 1024)).toFixed(2)} MB
              </span>

              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {uploadDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}