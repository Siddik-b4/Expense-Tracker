import React, { useMemo } from 'react';
import {
  TrendingUp,
  PieChart,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Info,
  Award,
} from 'lucide-react';
import { Expense, ExpenseCategory, EXPENSE_CATEGORIES } from '../types/expense';
import { CategoryIcon } from './CategoryIcon';
import { CATEGORY_STYLES } from '../utils/categoryHelpers';

interface SummaryScreenProps {
  expenses: Expense[];
  onOpenAddModal: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  expenses,
  onOpenAddModal,
}) => {
  const now = new Date();
  const currentMonthYear = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const currentMonthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Total All-Time Spend
  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  // Current Month Spend
  const monthlyAmount = useMemo(() => {
    return expenses
      .filter((e) => e.date.startsWith(currentMonthYear))
      .reduce((sum, item) => sum + item.amount, 0);
  }, [expenses, currentMonthYear]);

  // Category Totals
  const categoryStats = useMemo(() => {
    const map: Record<ExpenseCategory, number> = {
      Food: 0,
      Travel: 0,
      Shopping: 0,
      Education: 0,
      Entertainment: 0,
      Bills: 0,
      Other: 0,
    };

    expenses.forEach((e) => {
      if (map[e.category] !== undefined) {
        map[e.category] += e.amount;
      } else {
        map.Other += e.amount;
      }
    });

    return EXPENSE_CATEGORIES.map((cat) => {
      const amount = map[cat] || 0;
      const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;
      return {
        category: cat,
        amount,
        percentage,
      };
    }).sort((a, b) => b.amount - a.amount);
  }, [expenses, totalAmount]);

  // Highest Spending Category
  const highestCategory = useMemo(() => {
    if (categoryStats.length === 0 || totalAmount === 0) return null;
    const top = categoryStats[0];
    return top.amount > 0 ? top : null;
  }, [categoryStats, totalAmount]);

  if (expenses.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center mx-auto mb-4">
          <PieChart className="w-8 h-8 text-emerald-700 dark:text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          No Spending Analytics Yet
        </h3>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          Record at least one expense to generate automatic visual charts, category breakdowns, and top spending reports.
        </p>
        <button
          onClick={onOpenAddModal}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-all shadow-sm"
        >
          Add Your First Expense
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Metric 1: Total All-Time Spend */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Expenses
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3 tabular-nums">
            ${totalAmount.toFixed(2)}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
            <span>{expenses.length} recorded transactions</span>
            <span aria-hidden="true">·</span>
            <span>All time</span>
          </div>
        </div>

        {/* Metric 2: Monthly Spend */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Spent in {currentMonthName}
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-800 dark:text-blue-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3 tabular-nums">
            ${monthlyAmount.toFixed(2)}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
            <span>
              {totalAmount > 0
                ? `${((monthlyAmount / totalAmount) * 100).toFixed(0)}% of total lifetime spending`
                : '0%'}
            </span>
          </div>
        </div>
      </div>

      {/* Highest Spending Category Insight Card */}
      {highestCategory && (
        <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                  Highest Spending Category
                </p>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {highestCategory.category}
                </h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-1">
                  Accounting for <span className="font-bold">{highestCategory.percentage.toFixed(1)}%</span> of your total recorded expenses (${highestCategory.amount.toFixed(2)}).
                </p>
              </div>
            </div>

            <div className="self-end sm:self-center shrink-0 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-right">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Category Total</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                ${highestCategory.amount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Visual Spending Distribution Bars */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Category-Wise Breakdown
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time percentage progress indicators according to Material 3 specifications
          </p>
        </div>

        {/* Multi-segment visual bar */}
        <div className="w-full h-4 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
          {categoryStats
            .filter((c) => c.amount > 0)
            .map((item) => {
              const meta = CATEGORY_STYLES[item.category] || CATEGORY_STYLES['Other'];
              return (
                <div
                  key={item.category}
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: meta.color,
                  }}
                  title={`${item.category}: $${item.amount.toFixed(2)} (${item.percentage.toFixed(1)}%)`}
                  className="h-full transition-all duration-500"
                />
              );
            })}
        </div>

        {/* Detailed Category Rows with Progress Bars */}
        <div className="space-y-4 pt-2">
          {categoryStats.map((item) => {
            const meta = CATEGORY_STYLES[item.category] || CATEGORY_STYLES['Other'];
            const hasSpend = item.amount > 0;

            return (
              <div
                key={item.category}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${meta.bgColor} ${meta.textColor}`}
                    >
                      <CategoryIcon category={item.category} className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                      ${item.amount.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tabular-nums w-12 text-right">
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Individual Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-200/80 dark:bg-slate-700/80 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor: hasSpend ? meta.color : 'transparent',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
