import React, { useState } from 'react';
import { X, Edit2, Trash2, Calendar, Tag, FileText, Fingerprint, AlertTriangle } from 'lucide-react';
import { Expense } from '../types/expense';
import { CategoryIcon } from './CategoryIcon';
import { CATEGORY_STYLES } from '../utils/categoryHelpers';

interface ExpenseDetailModalProps {
  expense: Expense | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export const ExpenseDetailModal: React.FC<ExpenseDetailModalProps> = ({
  expense,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!isOpen || !expense) return null;

  const style = CATEGORY_STYLES[expense.category] || CATEGORY_STYLES['Other'];

  const handleDelete = () => {
    onDelete(expense.id);
    setShowConfirmDelete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Expense Details
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Amount Showcase Banner */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${style.bgColor} ${style.textColor}`}
            >
              <CategoryIcon category={expense.category} className="w-7 h-7" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums tracking-tight">
              ${expense.amount.toFixed(2)}
            </p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${style.bgColor} ${style.textColor}`}
            >
              {expense.category}
            </span>
          </div>

          {/* Details List */}
          <div className="space-y-3">
            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
              <Calendar className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Date
                </p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {new Date(expense.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
              <Tag className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Category
                </p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {expense.category}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
              <FileText className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Note & Description
                </p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 break-words">
                  {expense.note}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
              <Fingerprint className="w-4 h-4 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Transaction ID
                </p>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-400 break-all">
                  {expense.id}
                </p>
              </div>
            </div>
          </div>

          {/* Delete Confirmation Alert if active */}
          {showConfirmDelete ? (
            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-red-900 dark:text-red-200">
                    Delete this expense?
                  </p>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-0.5">
                    This will permanently remove the expense of ${expense.amount.toFixed(2)} from local storage.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          ) : (
            /* Action Buttons */
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(expense);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors"
              >
                <Edit2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmDelete(true)}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-100 text-sm font-semibold transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
