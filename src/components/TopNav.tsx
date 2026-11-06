import React from 'react';
import { Plus, Download, Smartphone, Monitor, Sun, Moon } from 'lucide-react';
import { ActiveTab } from '../types/expense';

interface TopNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenAddModal: () => void;
  onDownloadZip: () => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onTabChange,
  onOpenAddModal,
  onDownloadZip,
  isPhoneFrame,
  onTogglePhoneFrame,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onTabChange('tracker')}
          className="text-left group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            S
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
            SpendWise
          </span>
        </button>

        {/* Zone 2: 4 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onTabChange('tracker')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'tracker'
                ? 'text-emerald-800 dark:text-emerald-400 font-semibold border-b-2 border-emerald-800 dark:border-emerald-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Expense Tracker
          </button>
          <button
            onClick={() => onTabChange('summary')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'summary'
                ? 'text-emerald-800 dark:text-emerald-400 font-semibold border-b-2 border-emerald-800 dark:border-emerald-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Spending Summary
          </button>
          <button
            onClick={() => onTabChange('code')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'code'
                ? 'text-emerald-800 dark:text-emerald-400 font-semibold border-b-2 border-emerald-800 dark:border-emerald-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Flutter Dart Code
          </button>
          <button
            onClick={() => onTabChange('docs')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeTab === 'docs'
                ? 'text-emerald-800 dark:text-emerald-400 font-semibold border-b-2 border-emerald-800 dark:border-emerald-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Project Spec
          </button>
        </nav>

        {/* Zone 3: Primary action + Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Frame Toggle */}
          <button
            onClick={onTogglePhoneFrame}
            title={isPhoneFrame ? 'Switch to Full Dashboard' : 'Switch to Android Device Frame'}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Toggle device frame"
          >
            {isPhoneFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            title="Toggle Light/Dark Theme"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Download Flutter ZIP */}
          <button
            onClick={onDownloadZip}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Flutter ZIP</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New Expense</span>
          </button>
        </div>
      </div>
    </header>
  );
};
