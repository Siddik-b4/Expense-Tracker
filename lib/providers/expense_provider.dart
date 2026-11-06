import 'package:flutter/foundation.dart';
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
}
