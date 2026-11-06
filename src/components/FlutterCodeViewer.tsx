import React, { useState } from 'react';
import {
  FileCode,
  Copy,
  Check,
  Download,
  FolderTree,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { FLUTTER_FILES, FlutterFile } from '../data/flutterCode';

interface FlutterCodeViewerProps {
  onDownloadZip: () => void;
}

export const FlutterCodeViewer: React.FC<FlutterCodeViewerProps> = ({ onDownloadZip }) => {
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_FILES[1]); // default to main.dart
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSingleFile = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Overview Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>College Project Source Code · Flutter 3.35+ & Dart</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Complete Dart & Flutter Codebase
          </h2>
          <p className="text-xs text-slate-500 max-w-xl mt-1">
            Inspect, copy, or export the production-ready Flutter codebase designed for Android Studio. Built with ChangeNotifier Provider, SharedPreferences, and Material Design 3.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onDownloadZip}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] rounded-xl shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download All as ZIP</span>
          </button>
        </div>
      </div>

      {/* Explorer Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: File Tree Selector */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <FolderTree className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Project Structure
            </span>
          </div>

          <div className="space-y-1">
            {FLUTTER_FILES.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                    isSelected
                      ? 'bg-emerald-800 text-white font-semibold shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <FileCode
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-white' : 'text-emerald-700 dark:text-emerald-400'
                      }`}
                    />
                    <span className="truncate">{file.path}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 px-2">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Every file matches the requested folder schema under <code className="text-emerald-700 dark:text-emerald-400">lib/</code> with null safety and zero external sample stubs.
            </p>
          </div>
        </div>

        {/* Right Column: Code Viewer with Line Numbers */}
        <div className="lg:col-span-8 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          {/* Top Bar of Editor */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {selectedFile.path}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {selectedFile.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                title="Copy code to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <button
                onClick={downloadSingleFile}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                title="Download this file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Code Content */}
          <div className="p-4 sm:p-5 overflow-x-auto max-h-[620px] font-mono text-xs leading-relaxed selection:bg-emerald-900 selection:text-white">
            <pre>
              {selectedFile.code.split('\n').map((line, idx) => (
                <div key={idx} className="table-row hover:bg-slate-900/60">
                  <span className="table-cell select-none pr-4 text-slate-600 text-right w-10 text-[11px] tabular-nums">
                    {idx + 1}
                  </span>
                  <span className="table-cell whitespace-pre text-slate-200">
                    {line}
                  </span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
