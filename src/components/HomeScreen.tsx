import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  RotateCcw,
  AlertCircle,
  Calendar,
  DollarSign,
  TrendingUp,
  Receipt,
  CheckCircle2,
} from 'lucide-react';
import { Expense, ExpenseCategory, EXPENSE_CATEGORIES, ScreenState } from '../types/expense';
import { CategoryIcon } from './CategoryIcon';
import { CATEGORY_STYLES } from '../utils/categoryHelpers';

interface HomeScreenProps {
  expenses: Expense[];
  onOpenAddModal: () => void;
  onSelectExpense: (expense: Expense) => void;
  onResetData: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  expenses,
  onOpenAddModal,
  onSelectExpense,
  onResetData,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [simulatedState, setSimulatedState] = useState<ScreenState>('data');

  // Month summary calculation
  const now = new Date();
  const currentMonthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const currentMonthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });

  const monthlyTotal = useMemo(() => {
    return expenses
      .filter((e) => e.date.startsWith(currentMonthYear))
      .reduce((sum, item) => sum + item.amount, 0);
  }, [expenses, currentMonthYear]);

  const allTimeTotal = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  // Filtered and searched expenses, sorted latest first
  const displayedExpenses = useMemo(() => {
    return expenses
      .filter((item) => {
        const matchesCategory =
          selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === '' ||
          item.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.amount.toString().includes(searchQuery);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, selectedCategory, searchQuery]);

  // Render State 1: Loading
  if (simulatedState === 'loading') {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-800 rounded-full animate-spin mb-4" />
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
          Loading expenses from storage...
        </h3>
        <p className="text-xs text-slate-500 mt-1">Simulating SharedPreferences async retrieval</p>
        <button
          onClick={() => setSimulatedState('data')}
          className="mt-4 px-4 py-1.5 text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 rounded-lg hover:bg-emerald-100"
        >
          Return to Data State
        </button>
      </div>
    );
  }

  // Render State 2: Error
  if (simulatedState === 'error') {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center px-4 max-w-md mx-auto">
        <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Could not load expenses
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-5">
          Failed to read storage key from SharedPreferences. An unexpected storage fault occurred.
        </p>
        <button
          onClick={() => setSimulatedState('data')}
          className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all shadow-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  const isEmpty = displayedExpenses.length === 0 || simulatedState === 'empty';

  return (
    <div className="space-y-6 pb-24">
      {/* State Switcher bar for college demonstration */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Android Test States:
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSimulatedState('data')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              (simulatedState as string) === 'data'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Data ({expenses.length})
          </button>
          <button
            onClick={() => setSimulatedState('loading')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              (simulatedState as string) === 'loading'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Loading State
          </button>
          <button
            onClick={() => setSimulatedState('error')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              (simulatedState as string) === 'error'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Error State
          </button>
          <button
            onClick={() => setSimulatedState('empty')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              (simulatedState as string) === 'empty'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Empty State
          </button>
        </div>
        <button
          onClick={onResetData}
          title="Reset to default sample expenses"
          className="flex items-center gap-1 px-2.5 py-1 text-slate-600 dark:text-slate-400 hover:text-emerald-800 dark:hover:text-emerald-400 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Sample Data</span>
        </button>
      </div>

      {/* Top Banner: Current Month Total (Forest Green Gradient Card) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-900 p-6 sm:p-7 text-white shadow-lg shadow-emerald-950/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-200/90 text-xs font-medium uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Current Month · {currentMonthName}</span>
            </div>
            <div className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums">
              ${monthlyTotal.toFixed(2)}
            </div>
            <p className="mt-1 text-xs text-emerald-100/75">
              Total monthly spend calculated dynamically
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-emerald-700/60 sm:pl-6 text-left">
            <div>
              <p className="text-[11px] text-emerald-200/80 uppercase tracking-wider font-semibold">
                All-Time Spend
              </p>
              <p className="text-base font-bold tabular-nums">${allTimeTotal.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[11px] text-emerald-200/80 uppercase tracking-wider font-semibold">
                Total Transactions
              </p>
              <p className="text-base font-bold tabular-nums">{expenses.length} records</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Section */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search expense notes, categories, or amounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-xs sm:text-sm placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Horizontal Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              selectedCategory === 'All'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-600'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[10px] opacity-80 tabular-nums">({expenses.length})</span>
          </button>

          {EXPENSE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = expenses.filter((e) => e.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-sm font-semibold'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-600'
                }`}
              >
                <CategoryIcon category={cat} className="w-3.5 h-3.5 shrink-0" />
                <span>{cat}</span>
                {count > 0 && (
                  <span className="text-[10px] opacity-75 tabular-nums">({count})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expense List Section */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            {selectedCategory === 'All' ? 'Recent Expenses' : `${selectedCategory} Expenses`}
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {displayedExpenses.length} items
          </span>
        </div>

        {/* Empty State */}
        {isEmpty ? (
          <div className="p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center mb-3">
              <Receipt className="w-8 h-8 text-emerald-700 dark:text-emerald-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              No expenses recorded yet
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1 mb-5">
              {searchQuery
                ? `No transactions matched your search "${searchQuery}". Try a different filter.`
                : 'Keep your budget on track by tapping the "Add Expense" button below.'}
            </p>
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] rounded-xl shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Record First Expense</span>
            </button>
          </div>
        ) : (
          /* Data State: Rounded Material 3 Cards */
          <div className="space-y-2.5">
            {displayedExpenses.map((expense) => {
              const style = CATEGORY_STYLES[expense.category] || CATEGORY_STYLES['Other'];
              const dateObj = new Date(expense.date);
              const formattedDate = dateObj.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={expense.id}
                  onClick={() => onSelectExpense(expense)}
                  role="button"
                  tabIndex={0}
                  className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-3">
                    {/* Category Icon Badge */}
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${style.bgColor} ${style.textColor}`}
                    >
                      <CategoryIcon category={expense.category} className="w-5 h-5" />
                    </div>

                    {/* Title & Metadata */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {expense.category}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700 text-xs" aria-hidden="true">
                          ·
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {formattedDate}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">
                        {expense.note}
                      </p>
                    </div>
                  </div>

                  {/* Expense Amount */}
                  <div className="text-right shrink-0">
                    <span className="text-sm sm:text-base font-bold text-red-600 dark:text-red-400 tabular-nums">
                      -${expense.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) for rapid entry */}
      <button
        onClick={onOpenAddModal}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 flex items-center gap-2 px-5 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl shadow-xl shadow-emerald-950/20 active:scale-[0.97] transition-all font-semibold text-sm"
      >
        <Plus className="w-5 h-5" />
        <span>Add Expense</span>
      </button>
    </div>
  );
};
