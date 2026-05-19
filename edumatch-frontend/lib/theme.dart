import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

// ─────────────────────────────────────────────
//  EduMatch  ·  Joyful UI  ·  Design Tokens
// ─────────────────────────────────────────────

abstract class AppColors {
  // Backgrounds
  static const Color background = Color(0xFFFAF9F6); // off-white cream
  static const Color surface = Color(0xFFFFFFFF);

  // Brand
  static const Color deepBlue = Color(0xFF1A237E);   // dark headline ink

  // Accent palette – used to colour Bento cards
  static const Color mustardYellow = Color(0xFFFFC94A);
  static const Color brightOrange  = Color(0xFFFF6B35);
  static const Color mintGreen     = Color(0xFF4ECDC4);
  static const Color pastelPurple  = Color(0xFFB48FE0);
  static const Color skyBlue       = Color(0xFF5BA4CF);

  // Ordered list for systematic card colouring
  static const List<Color> cardAccents = [
    mustardYellow,
    brightOrange,
    mintGreen,
    pastelPurple,
    skyBlue,
  ];

  // Slightly darker shades used for pill-chip backgrounds
  static const List<Color> chipColors = [
    Color(0xFFFFF0C0), // mustard tint
    Color(0xFFFFE0D0), // orange tint
    Color(0xFFD0F5F3), // mint tint
    Color(0xFFEFE0FF), // purple tint
    Color(0xFFD0E9FF), // blue tint
  ];

  // Contrasting text on coloured chips
  static const List<Color> chipTextColors = [
    Color(0xFF7A5C00),
    Color(0xFF8B2D00),
    Color(0xFF006B63),
    Color(0xFF5B2E9B),
    Color(0xFF1A4E7A),
  ];
}

// ─────────────────────────────────────────────
//  Typography
// ─────────────────────────────────────────────

abstract class AppTextStyles {
  /// Heavy display heading – app title, section labels
  static TextStyle get displayBold => GoogleFonts.nunito(
        fontWeight: FontWeight.w900,
        fontSize: 28,
        color: AppColors.deepBlue,
        letterSpacing: -0.5,
      );

  /// Card name / sub-heading
  static TextStyle get cardTitle => GoogleFonts.nunito(
        fontWeight: FontWeight.w800,
        fontSize: 18,
        color: AppColors.deepBlue,
        letterSpacing: -0.2,
      );

  /// Rate badge text
  static TextStyle get priceBadge => GoogleFonts.nunito(
        fontWeight: FontWeight.w900,
        fontSize: 20,
        color: AppColors.deepBlue,
      );

  /// Secondary info (city, etc.)
  static TextStyle get bodyMuted => GoogleFonts.nunito(
        fontWeight: FontWeight.w600,
        fontSize: 13,
        color: const Color(0xFF7A7A8C),
      );

  /// Chip label text
  static TextStyle get chip => GoogleFonts.nunito(
        fontWeight: FontWeight.w700,
        fontSize: 12,
        letterSpacing: 0.2,
      );

  /// AppBar title
  static TextStyle get appBarTitle => GoogleFonts.nunito(
        fontWeight: FontWeight.w900,
        fontSize: 22,
        color: AppColors.deepBlue,
        letterSpacing: -0.5,
      );

  /// Section sub-label in AppBar
  static TextStyle get appBarSub => GoogleFonts.nunito(
        fontWeight: FontWeight.w600,
        fontSize: 13,
        color: const Color(0xFF9E9EB0),
      );
}

// ─────────────────────────────────────────────
//  MaterialTheme
// ─────────────────────────────────────────────

ThemeData buildAppTheme() {
  return ThemeData(
    useMaterial3: true,
    scaffoldBackgroundColor: AppColors.background,
    colorScheme: ColorScheme.light(
      primary: AppColors.deepBlue,
      secondary: AppColors.mustardYellow,
      surface: AppColors.surface,
      background: AppColors.background,
    ),
    textTheme: GoogleFonts.nunitoTextTheme(),
    appBarTheme: const AppBarTheme(
      backgroundColor: AppColors.background,
      elevation: 0,
      scrolledUnderElevation: 0,
      surfaceTintColor: Colors.transparent,
    ),
  );
}
