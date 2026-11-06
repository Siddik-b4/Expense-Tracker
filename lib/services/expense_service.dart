import 'dart:convert';
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
}
