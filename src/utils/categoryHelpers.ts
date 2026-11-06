import { ExpenseCategory } from '../types/expense';

export interface CategoryMeta {
  category: ExpenseCategory;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export const CATEGORY_STYLES: Record<ExpenseCategory, CategoryMeta> = {
  Food: {
    category: 'Food',
    color: '#2E7D32',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    textColor: 'text-emerald-700 dark:text-emerald-300',
  },
  Travel: {
    category: 'Travel',
    color: '#00897B',
    bgColor: 'bg-teal-50 dark:bg-teal-950/40',
    borderColor: 'border-teal-200 dark:border-teal-800',
    textColor: 'text-teal-700 dark:text-teal-300',
  },
  Shopping: {
    category: 'Shopping',
    color: '#43A047',
    bgColor: 'bg-green-50 dark:bg-green-950/40',
    borderColor: 'border-green-200 dark:border-green-800',
    textColor: 'text-green-700 dark:text-green-300',
  },
  Education: {
    category: 'Education',
    color: '#1E88E5',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-700 dark:text-blue-300',
  },
  Entertainment: {
    category: 'Entertainment',
    color: '#8E24AA',
    bgColor: 'bg-purple-50 dark:bg-purple-950/40',
    borderColor: 'border-purple-200 dark:border-purple-800',
    textColor: 'text-purple-700 dark:text-purple-300',
  },
  Bills: {
    category: 'Bills',
    color: '#D84315',
    bgColor: 'bg-orange-50 dark:bg-orange-950/40',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-700 dark:text-orange-300',
  },
  Other: {
    category: 'Other',
    color: '#546E7A',
    bgColor: 'bg-slate-50 dark:bg-slate-800/50',
    borderColor: 'border-slate-200 dark:border-slate-700',
    textColor: 'text-slate-700 dark:text-slate-300',
  },
};
