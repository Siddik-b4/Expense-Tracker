import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Terminal,
  Cpu,
  ShieldCheck,
  Smartphone,
  FolderGit2,
} from 'lucide-react';

export const ProjectDocs: React.FC = () => {
  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>College Group Project Report & Viva Guide</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1.5">
          SpendWise – Personal Expense Tracker (Android App)
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          Comprehensive project report outlining software architecture, data flow with Provider and SharedPreferences, Material 3 design guidelines, and presentation talking points for college viva examination.
        </p>
      </div>

      {/* Tech Stack Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 uppercase font-semibold">Framework</p>
          <p className="text-base font-bold text-slate-900 dark:text-white mt-1">Flutter 3.35+</p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">Dart Null-Safe</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 uppercase font-semibold">State Manager</p>
          <p className="text-base font-bold text-slate-900 dark:text-white mt-1">Provider 6.1.2</p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">ChangeNotifier</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 uppercase font-semibold">Persistence</p>
          <p className="text-base font-bold text-slate-900 dark:text-white mt-1">SharedPreferences</p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">JSON Serialization</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 uppercase font-semibold">UI Standard</p>
          <p className="text-base font-bold text-slate-900 dark:text-white mt-1">Material Design 3</p>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">Green & White Theme</p>
        </div>
      </div>

      {/* Architecture Deep Dive */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
          <span>System Architecture & Data Flow</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          SpendWise employs a clean separation of concerns using the <strong>MVVM (Model-View-ViewModel / Service-Provider)</strong> pattern:
        </p>

        <div className="space-y-3 pt-2 text-xs sm:text-sm">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <span className="font-bold text-slate-900 dark:text-white">1. Model Layer (`models/expense.dart`):</span>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Encapsulates the immutable <code className="text-emerald-700 dark:text-emerald-400">Expense</code> class with strict Dart sound null safety, JSON serialization (<code className="text-emerald-700 dark:text-emerald-400">toJson</code> / <code className="text-emerald-700 dark:text-emerald-400">fromJson</code>), copyWith methods, and predefined category metadata (Food, Travel, Shopping, Education, Entertainment, Bills, Other).
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <span className="font-bold text-slate-900 dark:text-white">2. Service Layer (`services/expense_service.dart`):</span>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Communicates directly with the platform through <code className="text-emerald-700 dark:text-emerald-400">SharedPreferences</code>. Serializes expense models into JSON strings and loads them asynchronously on application boot.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <span className="font-bold text-slate-900 dark:text-white">3. Provider Layer (`providers/expense_provider.dart`):</span>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Extends <code className="text-emerald-700 dark:text-emerald-400">ChangeNotifier</code>. Holds application state, active category filters, loading flags, and calculated getters (Current Month Total, Highest Spending Category, Category Breakdowns). Calls <code className="text-emerald-700 dark:text-emerald-400">notifyListeners()</code> to trigger seamless UI re-renders without full screen rebuilds.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
            <span className="font-bold text-slate-900 dark:text-white">4. View Layer (`screens/` & `widgets/`):</span>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Pure Material Design 3 widgets listening via <code className="text-emerald-700 dark:text-emerald-400">Consumer&lt;ExpenseProvider&gt;</code>. Reacts cleanly to all 4 UI states: Loading, Error with retry, Empty state, and Populated List state.
            </p>
          </div>
        </div>
      </div>

      {/* Setup in Android Studio */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
          <span>Android Studio Setup & Execution Guide</span>
        </h2>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 bg-slate-950 text-slate-200 rounded-xl">
            <p className="text-slate-500 select-none"># Step 1: Open project and get Flutter packages</p>
            <p className="text-emerald-400 font-semibold">flutter pub get</p>
          </div>

          <div className="p-3 bg-slate-950 text-slate-200 rounded-xl">
            <p className="text-slate-500 select-none"># Step 2: Check device compatibility and Android SDK</p>
            <p className="text-emerald-400 font-semibold">flutter doctor</p>
          </div>

          <div className="p-3 bg-slate-950 text-slate-200 rounded-xl">
            <p className="text-slate-500 select-none"># Step 3: Launch on Android Emulator or connected physical phone</p>
            <p className="text-emerald-400 font-semibold">flutter run</p>
          </div>
        </div>
      </div>

      {/* College Viva Questions & Answers */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
          <span>College Evaluation & Viva Talking Points</span>
        </h2>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <p className="font-bold text-slate-900 dark:text-white">
              Q: Why use Provider with ChangeNotifier instead of setState()?
            </p>
            <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              <strong>Answer:</strong> <code className="text-emerald-700 dark:text-emerald-400">setState()</code> is local to a single widget, making state sharing between screens (e.g., adding an expense on AddExpenseScreen and immediately updating HomeScreen and SummaryScreen) messy through callback passing. Provider with <code className="text-emerald-700 dark:text-emerald-400">ChangeNotifier</code> establishes a central single source of truth accessible anywhere in the widget tree via context.
            </p>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <p className="font-bold text-slate-900 dark:text-white">
              Q: How is data preserved across device reboots or app termination?
            </p>
            <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              <strong>Answer:</strong> Every addition, modification, or deletion triggers a call to <code className="text-emerald-700 dark:text-emerald-400">ExpenseService.saveExpenses()</code>, which transforms the Dart model list into a JSON string and writes to the platform’s native key-value storage via Android <code className="text-emerald-700 dark:text-emerald-400">SharedPreferences</code>.
            </p>
          </div>

          <div>
            <p className="font-bold text-slate-900 dark:text-white">
              Q: How does the application prevent crashes from invalid user inputs or rapid clicks?
            </p>
            <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              <strong>Answer:</strong> All fields use Flutter's <code className="text-emerald-700 dark:text-emerald-400">FormState.validate()</code> checking positive numbers, allowable ranges, and text constraints. Rapid taps are prevented using an internal boolean latch (<code className="text-emerald-700 dark:text-emerald-400">_isSubmitting</code>) that immediately disables the button upon the first touch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
