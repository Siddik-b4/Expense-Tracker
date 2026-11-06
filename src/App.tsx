/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import {
  Smartphone,
  Layers,
  FileCode,
  BookOpen,
  PieChart,
  Home,
  Plus,
  Wifi,
  Battery,
  Signal,
  Check,
} from 'lucide-react';
import { Expense, ActiveTab } from './types/expense';
import {
  getStoredExpenses,
  saveStoredExpenses,
  resetStoredExpenses,
} from './utils/storage';
import { FLUTTER_FILES } from './data/flutterCode';
import { TopNav } from './components/TopNav';
import { HomeScreen } from './components/HomeScreen';
import { SummaryScreen } from './components/SummaryScreen';
import { FlutterCodeViewer } from './components/FlutterCodeViewer';
import { ProjectDocs } from './components/ProjectDocs';
import { AddExpenseModal } from './components/AddExpenseModal';
import { ExpenseDetailModal } from './components/ExpenseDetailModal';

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => getStoredExpenses());
  const [activeTab, setActiveTab] = useState<ActiveTab>('tracker');
  const [isPhoneFrame, setIsPhoneFrame] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [selectedDetailExpense, setSelectedDetailExpense] = useState<Expense | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync dark mode class on document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add or update an expense
  const handleSaveExpense = (newOrUpdatedExpense: Expense) => {
    setExpenses((prev) => {
      const exists = prev.some((e) => e.id === newOrUpdatedExpense.id);
      let next: Expense[];
      if (exists) {
        next = prev.map((e) => (e.id === newOrUpdatedExpense.id ? newOrUpdatedExpense : e));
        showToast('Expense updated successfully in local storage');
      } else {
        next = [newOrUpdatedExpense, ...prev];
        showToast('Expense added to SpendWise');
      }
      saveStoredExpenses(next);
      return next;
    });

    // If detail modal was open with this expense, update it
    if (selectedDetailExpense && selectedDetailExpense.id === newOrUpdatedExpense.id) {
      setSelectedDetailExpense(newOrUpdatedExpense);
    }
  };

  // Delete an expense
  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveStoredExpenses(next);
      return next;
    });
    showToast('Expense permanently deleted');
  };

  // Reset to initial sample data
  const handleResetData = () => {
    const defaultData = resetStoredExpenses();
    setExpenses(defaultData);
    showToast('Reset sample expenses restored');
  };

  // 1-Click ZIP generator for the entire Flutter project
  const handleDownloadZip = async () => {
    try {
      const zip = new JSZip();

      // Add flutter files
      FLUTTER_FILES.forEach((file) => {
        zip.file(file.path, file.code);
      });

      // Add a simple project README
      zip.file(
        'README.md',
        `# SpendWise – Personal Expense Tracker (Flutter Project)
College Group Project built with Flutter 3.35, Provider, and SharedPreferences.

## Getting Started
1. Open this folder in Android Studio.
2. Run \`flutter pub get\` in terminal.
3. Launch on Android Emulator via \`flutter run\`.`
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'spendwise-flutter-android-project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Flutter Android project ZIP downloaded!');
    } catch (err) {
      console.error('Failed to create ZIP', err);
      showToast('Failed to create ZIP file.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Navigation */}
      <TopNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onOpenAddModal={() => {
          setEditingExpense(null);
          setIsAddModalOpen(true);
        }}
        onDownloadZip={handleDownloadZip}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-12">
        {activeTab === 'code' ? (
          <FlutterCodeViewer onDownloadZip={handleDownloadZip} />
        ) : activeTab === 'docs' ? (
          <ProjectDocs />
        ) : isPhoneFrame ? (
          /* Android Device Frame Simulation Mode */
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-full max-w-[400px] bg-slate-900 rounded-[48px] p-3.5 shadow-2xl border-4 border-slate-800 relative">
              {/* Camera Notch & Speaker */}
              <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto flex items-center justify-center gap-2 mb-1.5 z-20">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-700" />
                <div className="w-10 h-1 rounded-full bg-slate-700" />
              </div>

              {/* Android Screen Container */}
              <div className="w-full h-[720px] bg-white dark:bg-slate-900 rounded-[38px] overflow-hidden flex flex-col relative border border-slate-200 dark:border-slate-800">
                {/* Android Status Bar */}
                <div className="h-7 px-5 flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs select-none">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <Signal className="w-3 h-3" />
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Android App Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-4 py-2 no-scrollbar">
                  {activeTab === 'tracker' ? (
                    <HomeScreen
                      expenses={expenses}
                      onOpenAddModal={() => {
                        setEditingExpense(null);
                        setIsAddModalOpen(true);
                      }}
                      onSelectExpense={(expense) => setSelectedDetailExpense(expense)}
                      onResetData={handleResetData}
                    />
                  ) : (
                    <SummaryScreen
                      expenses={expenses}
                      onOpenAddModal={() => {
                        setEditingExpense(null);
                        setIsAddModalOpen(true);
                      }}
                    />
                  )}
                </div>

                {/* Android Material 3 Bottom Navigation Bar */}
                <div className="h-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-around px-2 z-20">
                  <button
                    onClick={() => setActiveTab('tracker')}
                    className={`flex flex-col items-center justify-center w-16 py-1 rounded-2xl transition-colors ${
                      activeTab === 'tracker'
                        ? 'text-emerald-800 dark:text-emerald-400 font-bold'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <div
                      className={`px-3 py-0.5 rounded-full ${
                        activeTab === 'tracker'
                          ? 'bg-emerald-100 dark:bg-emerald-950/80'
                          : ''
                      }`}
                    >
                      <Home className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] mt-0.5">Expenses</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('summary')}
                    className={`flex flex-col items-center justify-center w-16 py-1 rounded-2xl transition-colors ${
                      activeTab === 'summary'
                        ? 'text-emerald-800 dark:text-emerald-400 font-bold'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    <div
                      className={`px-3 py-0.5 rounded-full ${
                        activeTab === 'summary'
                          ? 'bg-emerald-100 dark:bg-emerald-950/80'
                          : ''
                      }`}
                    >
                      <PieChart className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] mt-0.5">Summary</span>
                  </button>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-3 text-center">
              Android 14 Material Design 3 Simulator · Click top-right monitor icon to expand
            </p>
          </div>
        ) : (
          /* Full Desktop / Tablet Dashboard Experience */
          <div>
            {activeTab === 'tracker' ? (
              <HomeScreen
                expenses={expenses}
                onOpenAddModal={() => {
                  setEditingExpense(null);
                  setIsAddModalOpen(true);
                }}
                onSelectExpense={(expense) => setSelectedDetailExpense(expense)}
                onResetData={handleResetData}
              />
            ) : (
              <SummaryScreen
                expenses={expenses}
                onOpenAddModal={() => {
                  setEditingExpense(null);
                  setIsAddModalOpen(true);
                }}
              />
            )}
          </div>
        )}
      </main>

      {/* Add / Edit Expense Modal */}
      <AddExpenseModal
        isOpen={isAddModalOpen}
        initialExpense={editingExpense}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingExpense(null);
        }}
        onSave={handleSaveExpense}
      />

      {/* Expense Detail Modal */}
      <ExpenseDetailModal
        expense={selectedDetailExpense}
        isOpen={selectedDetailExpense !== null}
        onClose={() => setSelectedDetailExpense(null)}
        onEdit={(expense) => {
          setEditingExpense(expense);
          setIsAddModalOpen(true);
        }}
        onDelete={handleDeleteExpense}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-2xl shadow-xl border border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
