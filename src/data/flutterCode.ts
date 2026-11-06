export interface FlutterFile {
  path: string;
  filename: string;
  folder: string;
  description: string;
  code: string;
}

export const FLUTTER_FILES: FlutterFile[] = [
  {
    path: 'pubspec.yaml',
    filename: 'pubspec.yaml',
    folder: 'Root',
    description: 'Flutter project dependencies (Provider, SharedPreferences, Intl, Uuid)',
    code: `name: spendwise
description: "SpendWise – Personal Expense Tracker Android Application for College Project"
publish_to: "none"
version: 1.0.0+1

environment:
  sdk: ">=3.3.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.2
  shared_preferences: ^2.3.2
  intl: ^0.19.0
  uuid: ^4.5.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^5.0.0

flutter:
  uses-material-design: true`,
  },
  {
    path: 'lib/main.dart',
    filename: 'main.dart',
    folder: 'lib',
    description: 'App entry point with MultiProvider, SharedPreferences init, and M3 Green & White Theme',
    code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/expense_provider.dart';
import 'screens/home_screen.dart';

void main() async {
  // Ensure Flutter engine bindings are initialized before calling SharedPreferences
  WidgetsFlutterBinding.ensureInitialized();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => ExpenseProvider()..fetchExpenses(),
        ),
      ],
      child: const SpendWiseApp(),
    ),
  );
}

/// Root Application Widget configured with Material 3 Green & White Theme
class SpendWiseApp extends StatelessWidget {
  const SpendWiseApp({super.key});

  @override
  Widget build(BuildContext context) {
    // Green and White Brand Seed Color
    const Color brandGreen = Color(0xFF1B5E20);

    return MaterialApp(
      title: 'SpendWise',
      debugShowCheckedModeBanner: false,

      // Light Material 3 Theme (Green and Crisp White)
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: brandGreen,
          brightness: Brightness.light,
          primary: brandGreen,
          onPrimary: Colors.white,
          primaryContainer: const Color(0xFFA5D6A7),
          onPrimaryContainer: const Color(0xFF002204),
          surface: Colors.white,
          onSurface: const Color(0xFF1A1C1E),
          surfaceContainerLow: const Color(0xFFF7F9F7),
          surfaceContainerHigh: const Color(0xFFE8ECE8),
        ),
        scaffoldBackgroundColor: const Color(0xFFFBFDFB),
        appBarTheme: const AppBarTheme(
          centerTitle: false,
          elevation: 0,
          backgroundColor: Color(0xFFFBFDFB),
          foregroundColor: Color(0xFF1A1C1E),
        ),
        cardTheme: CardTheme(
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: const Color(0xFFF4F6F4),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: Color(0xFFC2C8C2)),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: Color(0xFFE0E4E0)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(16),
            borderSide: const BorderSide(color: brandGreen, width: 2),
          ),
        ),
      ),

      // Dark Material 3 Theme
      darkTheme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: brandGreen,
          brightness: Brightness.dark,
          surface: const Color(0xFF121413),
        ),
        scaffoldBackgroundColor: const Color(0xFF121413),
      ),

      themeMode: ThemeMode.light,
      home: const HomeScreen(),
    );
  }
}`,
  },
  {
    path: 'lib/models/expense.dart',
    filename: 'expense.dart',
    folder: 'lib/models',
    description: 'Expense data model with JSON serialization, category metadata, and colors',
    code: `import 'package:flutter/material.dart';

/// Predefined expense categories required by SpendWise
class ExpenseCategory {
  static const String food = 'Food';
  static const String travel = 'Travel';
  static const String shopping = 'Shopping';
  static const String education = 'Education';
  static const String entertainment = 'Entertainment';
  static const String bills = 'Bills';
  static const String other = 'Other';

  static const List<String> all = [
    food,
    travel,
    shopping,
    education,
    entertainment,
    bills,
    other,
  ];

  /// Get icon representation for a given category
  static IconData getIcon(String category) {
    switch (category) {
      case food:
        return Icons.restaurant_rounded;
      case travel:
        return Icons.directions_car_rounded;
      case shopping:
        return Icons.shopping_bag_rounded;
      case education:
        return Icons.school_rounded;
      case entertainment:
        return Icons.movie_filter_rounded;
      case bills:
        return Icons.receipt_long_rounded;
      case other:
      default:
        return Icons.category_rounded;
    }
  }

  /// Get theme color for category icon and indicator
  static Color getColor(String category) {
    switch (category) {
      case food:
        return const Color(0xFF2E7D32); // Forest Green
      case travel:
        return const Color(0xFF00897B); // Teal
      case shopping:
        return const Color(0xFF43A047); // Emerald Green
      case education:
        return const Color(0xFF1E88E5); // Blue
      case entertainment:
        return const Color(0xFF8E24AA); // Purple
      case bills:
        return const Color(0xFFD84315); // Deep Orange
      case other:
      default:
        return const Color(0xFF546E7A); // Slate Grey
    }
  }
}

/// Expense model with null-safety and JSON serialization
class Expense {
  final String id;
  final double amount;
  final String category;
  final DateTime date;
  final String note;

  const Expense({
    required this.id,
    required this.amount,
    required this.category,
    required this.date,
    required this.note,
  });

  factory Expense.fromJson(Map<String, dynamic> json) {
    return Expense(
      id: json['id'] as String,
      amount: (json['amount'] as num).toDouble(),
      category: json['category'] as String,
      date: DateTime.parse(json['date'] as String),
      note: json['note'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'amount': amount,
      'category': category,
      'date': date.toIso8601String(),
      'note': note,
    };
  }

  Expense copyWith({
    String? id,
    double? amount,
    String? category,
    DateTime? date,
    String? note,
  }) {
    return Expense(
      id: id ?? this.id,
      amount: amount ?? this.amount,
      category: category ?? this.category,
      date: date ?? this.date,
      note: note ?? this.note,
    );
  }
}`,
  },
  {
    path: 'lib/services/expense_service.dart',
    filename: 'expense_service.dart',
    folder: 'lib/services',
    description: 'SharedPreferences asynchronous CRUD persistence',
    code: `import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/expense.dart';

/// Service responsible for persisting and loading expenses using SharedPreferences
class ExpenseService {
  static const String _storageKey = 'spendwise_expenses_data';

  /// Load all stored expenses from SharedPreferences
  Future<List<Expense>> loadExpenses() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final String? jsonString = prefs.getString(_storageKey);

      if (jsonString == null || jsonString.isEmpty) {
        return [];
      }

      final List<dynamic> decodedList = jsonDecode(jsonString) as List<dynamic>;
      return decodedList
          .map((item) => Expense.fromJson(item as Map<String, dynamic>))
          .toList();
    } catch (e) {
      throw Exception('Failed to load expenses from local storage: $e');
    }
  }

  /// Save list of expenses into SharedPreferences
  Future<bool> saveExpenses(List<Expense> expenses) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final List<Map<String, dynamic>> rawList =
          expenses.map((e) => e.toJson()).toList();
      final String jsonString = jsonEncode(rawList);
      return await prefs.setString(_storageKey, jsonString);
    } catch (e) {
      throw Exception('Failed to save expenses to local storage: $e');
    }
  }

  /// Clear all stored expenses from device
  Future<bool> clearAllExpenses() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      return await prefs.remove(_storageKey);
    } catch (e) {
      throw Exception('Failed to clear expenses: $e');
    }
  }
}`,
  },
  {
    path: 'lib/providers/expense_provider.dart',
    filename: 'expense_provider.dart',
    folder: 'lib/providers',
    description: 'ChangeNotifier state management with monthly calculations, filtering, and CRUD operations',
    code: `import 'package:flutter/foundation.dart';
import '../models/expense.dart';
import '../services/expense_service.dart';

/// State management provider for SpendWise using ChangeNotifier
class ExpenseProvider extends ChangeNotifier {
  final ExpenseService _service;

  ExpenseProvider({ExpenseService? service})
      : _service = service ?? ExpenseService();

  List<Expense> _expenses = [];
  bool _isLoading = false;
  String? _errorMessage;
  String _selectedCategory = 'All';

  // Getters
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  String get selectedCategory => _selectedCategory;

  /// Returns all expenses, sorted latest first
  List<Expense> get allExpenses {
    final sorted = List<Expense>.from(_expenses);
    sorted.sort((a, b) => b.date.compareTo(a.date));
    return sorted;
  }

  /// Returns expenses filtered by current category selection
  List<Expense> get filteredExpenses {
    final all = allExpenses;
    if (_selectedCategory == 'All') {
      return all;
    }
    return all.where((e) => e.category == _selectedCategory).toList();
  }

  /// Calculate total expenses for the current month
  double get currentMonthTotal {
    final now = DateTime.now();
    return _expenses
        .where((e) => e.date.year == now.year && e.date.month == now.month)
        .fold(0.0, (sum, item) => sum + item.amount);
  }

  /// Calculate overall total expenses
  double get totalExpenses {
    return _expenses.fold(0.0, (sum, item) => sum + item.amount);
  }

  /// Total count of expenses
  int get totalCount => _expenses.length;

  /// Get expenses grouped and summed by category
  Map<String, double> get categoryTotals {
    final Map<String, double> totals = {};
    for (final category in ExpenseCategory.all) {
      totals[category] = 0.0;
    }
    for (final exp in _expenses) {
      totals[exp.category] = (totals[exp.category] ?? 0.0) + exp.amount;
    }
    return totals;
  }

  /// Get highest spending category name and amount
  MapEntry<String, double>? get highestSpendingCategory {
    final totals = categoryTotals;
    if (totals.isEmpty || totalExpenses == 0) return null;

    MapEntry<String, double>? highest;
    totals.forEach((category, amount) {
      if (amount > 0 && (highest == null || amount > highest!.value)) {
        highest = MapEntry(category, amount);
      }
    });
    return highest;
  }

  /// Set category filter and update UI
  void setCategoryFilter(String category) {
    if (_selectedCategory != category) {
      _selectedCategory = category;
      notifyListeners();
    }
  }

  /// Clear any error message
  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  /// Fetch all expenses from SharedPreferences
  Future<void> fetchExpenses() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _expenses = await _service.loadExpenses();
      _isLoading = false;
      notifyListeners();
    } catch (e) {
      _isLoading = false;
      _errorMessage = 'Could not load expenses. Please try again.';
      notifyListeners();
    }
  }

  /// Add a new expense and persist to device
  Future<bool> addExpense(Expense expense) async {
    try {
      _expenses.add(expense);
      await _service.saveExpenses(_expenses);
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = 'Failed to save expense locally.';
      notifyListeners();
      return false;
    }
  }

  /// Update an existing expense
  Future<bool> updateExpense(Expense updatedExpense) async {
    final index = _expenses.indexWhere((e) => e.id == updatedExpense.id);
    if (index == -1) {
      _errorMessage = 'Expense not found to update.';
      notifyListeners();
      return false;
    }

    try {
      _expenses[index] = updatedExpense;
      await _service.saveExpenses(_expenses);
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = 'Failed to update expense locally.';
      notifyListeners();
      return false;
    }
  }

  /// Delete an expense by ID
  Future<bool> deleteExpense(String id) async {
    try {
      _expenses.removeWhere((e) => e.id == id);
      await _service.saveExpenses(_expenses);
      notifyListeners();
      return true;
    } catch (e) {
      _errorMessage = 'Failed to delete expense.';
      notifyListeners();
      return false;
    }
  }
}`,
  },
  {
    path: 'lib/screens/home_screen.dart',
    filename: 'home_screen.dart',
    folder: 'lib/screens',
    description: 'Main screen with monthly total card, category filter, state handling, and FAB',
    code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../models/expense.dart';
import '../providers/expense_provider.dart';
import '../widgets/expense_card.dart';
import 'add_expense_screen.dart';
import 'summary_screen.dart';

/// Home / Expense List Screen of SpendWise
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final currencyFormat = NumberFormat.currency(symbol: '\$', decimalDigits: 2);
    final currentMonthName = DateFormat('MMMM yyyy').format(DateTime.now());

    return Scaffold(
      backgroundColor: theme.colorScheme.surface,
      appBar: AppBar(
        title: const Text('SpendWise', style: TextStyle(fontWeight: FontWeight.w700)),
        actions: [
          IconButton(
            tooltip: 'Spending Summary',
            icon: const Icon(Icons.insights_rounded),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const SummaryScreen()),
              );
            },
          ),
        ],
      ),
      body: Consumer<ExpenseProvider>(
        builder: (context, provider, child) {
          // 1. Loading State
          if (provider.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          // 2. Error State
          if (provider.errorMessage != null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.error_outline_rounded, size: 56, color: theme.colorScheme.error),
                  const SizedBox(height: 12),
                  Text(provider.errorMessage!),
                  const SizedBox(height: 16),
                  FilledButton(
                    onPressed: () => provider.fetchExpenses(),
                    child: const Text('Try Again'),
                  ),
                ],
              ),
            );
          }

          final filteredList = provider.filteredExpenses;

          return RefreshIndicator(
            onRefresh: () => provider.fetchExpenses(),
            child: CustomScrollView(
              slivers: [
                // Highlight Banner: Current Month Total
                SliverToBoxAdapter(
                  child: Container(
                    margin: const EdgeInsets.all(16),
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFF1B5E20), Color(0xFF2E7D32)],
                      ),
                      borderRadius: BorderRadius.circular(24),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Spent in $currentMonthName', style: const TextStyle(color: Colors.white70)),
                        const SizedBox(height: 8),
                        Text(
                          currencyFormat.format(provider.currentMonthTotal),
                          style: const TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ),
                ),

                // Category Chips Selector
                SliverToBoxAdapter(
                  child: SizedBox(
                    height: 48,
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                      children: [
                        FilterChip(
                          label: const Text('All'),
                          selected: provider.selectedCategory == 'All',
                          onSelected: (_) => provider.setCategoryFilter('All'),
                        ),
                        ...ExpenseCategory.all.map((c) => FilterChip(
                              label: Text(c),
                              selected: provider.selectedCategory == c,
                              onSelected: (_) => provider.setCategoryFilter(c),
                            )),
                      ],
                    ),
                  ),
                ),

                // 3. Empty State or 4. List State
                if (filteredList.isEmpty)
                  const SliverFillRemaining(
                    child: Center(child: Text('No expenses recorded yet. Tap + to add one.')),
                  )
                else
                  SliverList(
                    delegate: SliverChildBuilderDelegate(
                      (context, i) => ExpenseCard(expense: filteredList[i]),
                      childCount: filteredList.length,
                    ),
                  ),
              ],
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          Navigator.push(context, MaterialPageRoute(builder: (context) => const AddExpenseScreen()));
        },
        backgroundColor: const Color(0xFF1B5E20),
        foregroundColor: Colors.white,
        icon: const Icon(Icons.add_rounded),
        label: const Text('Add Expense'),
      ),
    );
  }
}`,
  },
  {
    path: 'lib/screens/add_expense_screen.dart',
    filename: 'add_expense_screen.dart',
    folder: 'lib/screens',
    description: 'Validated form for adding and editing expenses with rapid-tap protection',
    code: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import 'package:uuid/uuid.dart';
import '../models/expense.dart';
import '../providers/expense_provider.dart';

class AddExpenseScreen extends StatefulWidget {
  final Expense? initialExpense;
  const AddExpenseScreen({super.key, this.initialExpense});

  @override
  State<AddExpenseScreen> createState() => _AddExpenseScreenState();
}

class _AddExpenseScreenState extends State<AddExpenseScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _amountController;
  late TextEditingController _noteController;
  late String _selectedCategory;
  late DateTime _selectedDate;
  bool _isSubmitting = false;

  bool get isEditing => widget.initialExpense != null;

  @override
  void initState() {
    super.initState();
    final expense = widget.initialExpense;
    _amountController = TextEditingController(text: expense != null ? expense.amount.toStringAsFixed(2) : '');
    _noteController = TextEditingController(text: expense?.note ?? '');
    _selectedCategory = expense?.category ?? ExpenseCategory.food;
    _selectedDate = expense?.date ?? DateTime.now();
  }

  @override
  void dispose() {
    _amountController.dispose();
    _noteController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (_isSubmitting || !_formKey.currentState!.validate()) return;
    setState(() => _isSubmitting = true);

    final amount = double.parse(_amountController.text.trim());
    final note = _noteController.text.trim();
    final provider = Provider.of<ExpenseProvider>(context, listen: false);

    bool success;
    if (isEditing) {
      success = await provider.updateExpense(
        widget.initialExpense!.copyWith(amount: amount, category: _selectedCategory, date: _selectedDate, note: note),
      );
    } else {
      success = await provider.addExpense(
        Expense(id: const Uuid().v4(), amount: amount, category: _selectedCategory, date: _selectedDate, note: note),
      );
    }

    if (mounted) {
      setState(() => _isSubmitting = false);
      if (success) Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(isEditing ? 'Edit Expense' : 'Add Expense')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _amountController,
                keyboardType: const TextInputType.numberWithOptions(decimal: true),
                decoration: const InputDecoration(labelText: 'Amount *', prefixText: '\$ '),
                validator: (val) {
                  if (val == null || val.trim().isEmpty) return 'Enter amount';
                  final num = double.tryParse(val.trim());
                  if (num == null || num <= 0) return 'Must be a positive number';
                  return null;
                },
              ),
              const SizedBox(height: 16),
              DropdownButtonFormField<String>(
                value: _selectedCategory,
                decoration: const InputDecoration(labelText: 'Category *'),
                items: ExpenseCategory.all.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
                onChanged: (val) => setState(() => _selectedCategory = val!),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _noteController,
                decoration: const InputDecoration(labelText: 'Note *'),
                validator: (val) => (val == null || val.trim().isEmpty) ? 'Enter a description' : null,
              ),
              const SizedBox(height: 24),
              FilledButton(
                onPressed: _isSubmitting ? null : _submit,
                child: Text(isEditing ? 'Save Changes' : 'Record Expense'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}`,
  },
  {
    path: 'lib/screens/expense_detail_screen.dart',
    filename: 'expense_detail_screen.dart',
    folder: 'lib/screens',
    description: 'Detailed view of an expense with Edit and Delete options',
    code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../models/expense.dart';
import '../providers/expense_provider.dart';
import 'add_expense_screen.dart';

class ExpenseDetailScreen extends StatelessWidget {
  final String expenseId;
  const ExpenseDetailScreen({super.key, required this.expenseId});

  @override
  Widget build(BuildContext context) {
    return Consumer<ExpenseProvider>(
      builder: (context, provider, child) {
        final expense = provider.allExpenses.where((e) => e.id == expenseId).firstOrNull;
        if (expense == null) {
          return Scaffold(
            appBar: AppBar(),
            body: const Center(child: Text('Expense not found.')),
          );
        }

        return Scaffold(
          appBar: AppBar(
            title: const Text('Expense Details'),
            actions: [
              IconButton(
                icon: const Icon(Icons.edit_outlined),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => AddExpenseScreen(initialExpense: expense)),
                  );
                },
              ),
              IconButton(
                icon: const Icon(Icons.delete_outline),
                onPressed: () async {
                  final confirm = await showDialog<bool>(
                    context: context,
                    builder: (ctx) => AlertDialog(
                      title: const Text('Delete Expense?'),
                      content: const Text('Are you sure you want to delete this expense?'),
                      actions: [
                        TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
                        FilledButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Delete')),
                      ],
                    ),
                  );
                  if (confirm == true && context.mounted) {
                    await provider.deleteExpense(expense.id);
                    if (context.mounted) Navigator.pop(context);
                  }
                },
              ),
            ],
          ),
          body: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('-\$' + expense.amount.toStringAsFixed(2), style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold)),
                const SizedBox(height: 8),
                Text('Category: ' + expense.category),
                Text('Date: ' + DateFormat.yMMMd().format(expense.date)),
                Text('Note: ' + expense.note),
              ],
            ),
          ),
        );
      },
    );
  }
}`,
  },
  {
    path: 'lib/screens/summary_screen.dart',
    filename: 'summary_screen.dart',
    folder: 'lib/screens',
    description: 'Spending summary with highest spending category and visual progress breakdown',
    code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/expense.dart';
import '../providers/expense_provider.dart';

class SummaryScreen extends StatelessWidget {
  const SummaryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Spending Summary')),
      body: Consumer<ExpenseProvider>(
        builder: (context, provider, child) {
          final total = provider.totalExpenses;
          final highest = provider.highestSpendingCategory;

          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Text('Total Spend: \$' + total.toStringAsFixed(2), style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                ),
              ),
              if (highest != null)
                Card(
                  color: const Color(0xFFE8F5E9),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Text('Top Category: ' + highest.key + ' (\$' + highest.value.toStringAsFixed(2) + ')'),
                  ),
                ),
              const SizedBox(height: 16),
              ...ExpenseCategory.all.map((c) {
                final amount = provider.categoryTotals[c] ?? 0.0;
                final pct = total > 0 ? (amount / total) : 0.0;
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(c + ': \$' + amount.toStringAsFixed(2) + ' (' + (pct * 100).toStringAsFixed(0) + '%)'),
                    LinearProgressIndicator(value: pct, color: const Color(0xFF1B5E20)),
                    const SizedBox(height: 12),
                  ],
                );
              }),
            ],
          );
        },
      ),
    );
  }
}`,
  },
  {
    path: 'lib/widgets/expense_card.dart',
    filename: 'expense_card.dart',
    folder: 'lib/widgets',
    description: 'Reusable Material 3 card widget for expense row items',
    code: `import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/expense.dart';
import '../screens/expense_detail_screen.dart';

class ExpenseCard extends StatelessWidget {
  final Expense expense;
  const ExpenseCard({super.key, required this.expense});

  @override
  Widget build(BuildContext context) {
    final categoryColor = ExpenseCategory.getColor(expense.category);
    final categoryIcon = ExpenseCategory.getIcon(expense.category);

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: categoryColor.withOpacity(0.15),
          child: Icon(categoryIcon, color: categoryColor),
        ),
        title: Text(expense.category, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(expense.note + ' • ' + DateFormat.MMMd().format(expense.date)),
        trailing: Text(
          '-\$' + expense.amount.toStringAsFixed(2),
          style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFC62828)),
        ),
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => ExpenseDetailScreen(expenseId: expense.id)),
          );
        },
      ),
    );
  }
}`,
  },
];
