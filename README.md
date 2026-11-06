# SpendWise – Personal Expense Tracker (Android Application)
**College Group Project Specification & Documentation**

SpendWise is a modern, lightweight, beginner-friendly personal expense tracking Android application built using **Flutter (v3.35+)**, **Dart (with sound null safety)**, **Provider (`ChangeNotifier`)**, and **SharedPreferences**.

---

## 📱 Technology Stack
- **Framework**: Flutter 3.35+
- **Language**: Dart (Null-Safe)
- **State Management**: `provider: ^6.1.2` (`ChangeNotifierProvider` & `Consumer`)
- **Local Persistence**: `shared_preferences: ^2.3.2`
- **Design System**: Material Design 3 (Green and White Theme)
- **IDE**: Android Studio / VS Code

---

## 📂 Project Folder Structure

```
lib/
├── models/
│   └── expense.dart             # Expense data model, JSON serialization, category metadata
├── services/
│   └── expense_service.dart     # SharedPreferences CRUD logic & JSON persistence
├── providers/
│   └── expense_provider.dart    # ChangeNotifier state management, filtering, aggregations
├── screens/
│   ├── home_screen.dart         # Main expense list, monthly total card, category filter, FAB
│   ├── add_expense_screen.dart  # Validated form for adding & editing expenses
│   ├── expense_detail_screen.dart # Detailed expense view with edit/delete dialogs
│   └── summary_screen.dart      # Category-wise analytics, top spending insights, progress bars
├── widgets/
│   └── expense_card.dart        # Reusable Material 3 rounded card with category icons
└── main.dart                    # App initialization, MultiProvider, Material 3 theme configuration
```

---

## ✨ Features Implemented

1. **Home / Expense List Screen**
   - Live list of user expenses sorted latest first.
   - Dynamic monthly total banner for the current calendar month.
   - Horizontal category filter chips (`All`, `Food`, `Travel`, `Shopping`, `Education`, `Entertainment`, `Bills`, `Other`).
   - Four distinct application states: **Loading**, **Error (with retry)**, **Empty (friendly placeholder)**, and **Data list**.
   - Floating Action Button (FAB) leading directly to the Add Expense screen.

2. **Add & Edit Expense Screen**
   - Robust form validation for every single field:
     - Amount: non-empty, positive numeric, max limit check.
     - Category: selection from the 7 required categories.
     - Date: date picker with formatted display.
     - Note: non-empty description.
   - Double-tap and rapid tap prevention (`_isSubmitting` latch).
   - Reusable for both creating new transactions and updating existing records.

3. **Expense Details Screen**
   - Prominent amount card with dedicated category iconography and themed colors.
   - Formatted timestamp, category label, description, and unique transaction ID.
   - Edit button to update the record.
   - Delete button with Material 3 confirmation dialog.

4. **Expense Summary Screen**
   - High-level metric cards: Total all-time spend and current month spend.
   - Highlighted card for the **Highest Spending Category** with percentage contribution.
   - Category-wise spending breakdown with visual progress indicators.

5. **Persistence & Resilience**
   - Expenses are serialized to JSON and saved permanently to device `SharedPreferences`.
   - Data persists across app restarts and device reboots.
   - Sound null-safety guarantees zero runtime null crashes.

---

## 🚀 How to Run in Android Studio

1. **Clone or Download the Project**:
   Ensure you have Flutter SDK 3.35 or higher installed. Run `flutter doctor` to verify.

2. **Install Dependencies**:
   ```bash
   flutter pub get
   ```

3. **Launch on Android Emulator or Physical Device**:
   - Open Android Studio.
   - Open the project directory.
   - Select an Android Virtual Device (AVD) with API level 30 or higher.
   - Press **Run (Shift + F10)** or execute:
     ```bash
     flutter run
     ```

---

## 🎓 Group Project Evaluation Highlights
- **Architecture**: Decoupled Model-View-Service-Provider architecture.
- **Null Safety**: 100% sound null safety with `required` properties and non-nullable types.
- **Material 3**: Uses `useMaterial3: true`, `ColorScheme.fromSeed`, and rounded surface containers.
- **Error Handling**: Graceful recovery on missing data or failed storage operations.
