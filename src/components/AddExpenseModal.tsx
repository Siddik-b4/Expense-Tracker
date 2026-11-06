import React, { useState, useEffect } from 'react';
import { X, Calendar, DollarSign, FileText } from 'lucide-react';
import { Expense, ExpenseCategory, EXPENSE_CATEGORIES } from '../types/expense';
import { CategoryIcon } from './CategoryIcon';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Expense) => void;
  initialExpense?: Expense | null;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialExpense,
}) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  const [errors, setErrors] = useState<{
    amount?: string;
    category?: string;
    date?: string;
    note?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialExpense) {
      setAmount(initialExpense.amount.toString());
      setCategory(initialExpense.category);
      setDate(initialExpense.date);
      setNote(initialExpense.note);
    } else {
      setAmount('');
      setCategory('Food');
      setDate(new Date().toISOString().split('T')[0]);
      setNote('');
    }
    setErrors({});
    setIsSubmitting(false);
  }, [initialExpense, isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    // Validate Amount
    const cleanAmount = amount.trim();
    if (!cleanAmount) {
      newErrors.amount = 'Please enter an expense amount.';
    } else {
      const parsed = parseFloat(cleanAmount);
      if (isNaN(parsed)) {
        newErrors.amount = 'Amount must be a valid number.';
      } else if (parsed <= 0) {
        newErrors.amount = 'Amount must be greater than zero.';
      } else if (parsed > 1000000) {
        newErrors.amount = 'Amount cannot exceed $1,000,000.';
      }
    }

    // Validate Category
    if (!category || !EXPENSE_CATEGORIES.includes(category)) {
      newErrors.category = 'Please select a valid expense category.';
    }

    // Validate Date
    if (!date) {
      newErrors.date = 'Please pick a valid expense date.';
    }

    // Validate Note
    const cleanNote = note.trim();
    if (!cleanNote) {
      newErrors.note = 'Please enter a brief note describing the expense.';
    } else if (cleanNote.length < 2) {
      newErrors.note = 'Note must be at least 2 characters long.';
    } else if (cleanNote.length > 150) {
      newErrors.note = 'Note cannot exceed 150 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent rapid multiple taps
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);

    const expensePayload: Expense = {
      id: initialExpense ? initialExpense.id : `exp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      category,
      date,
      note: note.trim(),
    };

    // Simulate standard smooth async saving feedback
    setTimeout(() => {
      onSave(expensePayload);
      setIsSubmitting(false);
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {initialExpense ? 'Edit Expense' : 'Add New Expense'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Material 3 validated expense form
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Amount Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Expense Amount *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white rounded-2xl border ${
                  errors.amount
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-200 dark:border-slate-700 focus:border-emerald-700 focus:ring-emerald-700'
                } focus:outline-none focus:ring-1 text-base tabular-nums`}
              />
            </div>
            {errors.amount && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 flex items-center gap-1">
                {errors.amount}
              </p>
            )}
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Expense Category *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {EXPENSE_CATEGORIES.map((cat) => {
                const isSelected = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-600'
                    }`}
                  >
                    <CategoryIcon category={cat} className="w-4 h-4 shrink-0" />
                    <span className="truncate">{cat}</span>
                  </button>
                );
              })}
            </div>
            {errors.category && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1.5">{errors.category}</p>
            )}
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Expense Date *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="date"
                value={date}
                max={new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString().split('T')[0]}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white rounded-2xl border ${
                  errors.date
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-200 dark:border-slate-700 focus:border-emerald-700 focus:ring-emerald-700'
                } focus:outline-none focus:ring-1 text-sm`}
              />
            </div>
            {errors.date && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1.5">{errors.date}</p>
            )}
          </div>

          {/* Note / Description */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Note / Description *
              </label>
              <span className="text-[11px] text-slate-400 tabular-nums">
                {note.length}/150
              </span>
            </div>
            <div className="relative">
              <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                <FileText className="w-4 h-4" />
              </div>
              <textarea
                rows={3}
                placeholder="e.g. Grocery items, metro commute, lunch at college canteen"
                value={note}
                maxLength={150}
                onChange={(e) => setNote(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/70 text-slate-900 dark:text-white rounded-2xl border ${
                  errors.note
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-200 dark:border-slate-700 focus:border-emerald-700 focus:ring-emerald-700'
                } focus:outline-none focus:ring-1 text-sm resize-none`}
              />
            </div>
            {errors.note && (
              <p className="text-xs text-red-600 dark:text-red-400 mt-1.5">{errors.note}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-[0.98] rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </span>
              ) : (
                <span>{initialExpense ? 'Save Changes' : 'Record Expense'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
