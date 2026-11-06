import 'package:flutter/material.dart';

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

  /// Factory constructor to create an Expense from a JSON Map
  factory Expense.fromJson(Map<String, dynamic> json) {
    return Expense(
      id: json['id'] as String,
      amount: (json['amount'] as num).toDouble(),
      category: json['category'] as String,
      date: DateTime.parse(json['date'] as String),
      note: json['note'] as String,
    );
  }

  /// Convert Expense instance into a JSON-compatible Map
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'amount': amount,
      'category': category,
      'date': date.toIso8601String(),
      'note': note,
    };
  }

  /// Create a copy of Expense with optional updated fields
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

  @override
  String toString() {
    return 'Expense(id: $id, amount: $amount, category: $category, date: $date, note: $note)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is Expense && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;
}
