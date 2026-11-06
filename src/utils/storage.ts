import { Expense } from '../types/expense';

const STORAGE_KEY = 'spendwise_web_expenses_v1';

export const INITIAL_SEED_EXPENSES: Expense[] = [
  {
    id: 'exp-101',
    amount: 14.50,
    category: 'Food',
    date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString().split('T')[0],
    note: 'Campus cafeteria lunch & iced coffee',
  },
  {
    id: 'exp-102',
    amount: 68.00,
    category: 'Education',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString().split('T')[0],
    note: 'Data Structures textbook & notebook set',
  },
  {
    id: 'exp-103',
    amount: 22.75,
    category: 'Travel',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString().split('T')[0],
    note: 'Weekly subway commuter transit card',
  },
  {
    id: 'exp-104',
    amount: 45.00,
    category: 'Bills',
    date: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString().split('T')[0],
    note: 'Monthly 5G mobile data plan',
  },
  {
    id: 'exp-105',
    amount: 18.00,
    category: 'Entertainment',
    date: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString().split('T')[0],
    note: 'Weekend cinema ticket with college peers',
  },
  {
    id: 'exp-106',
    amount: 34.20,
    category: 'Shopping',
    date: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString().split('T')[0],
    note: 'Ergonomic laptop stand & mousepad',
  },
];

export function getStoredExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_EXPENSES));
      return INITIAL_SEED_EXPENSES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SEED_EXPENSES;
  } catch (err) {
    console.error('Failed to read from localStorage', err);
    return INITIAL_SEED_EXPENSES;
  }
}

export function saveStoredExpenses(expenses: Expense[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (err) {
    console.error('Failed to save to localStorage', err);
  }
}

export function resetStoredExpenses(): Expense[] {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SEED_EXPENSES));
  return INITIAL_SEED_EXPENSES;
}
