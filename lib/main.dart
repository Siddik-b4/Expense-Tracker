import 'package:flutter/material.dart';
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
}
