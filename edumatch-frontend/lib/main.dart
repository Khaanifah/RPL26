import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'models/tutor.dart';
import 'services/api_service.dart';
import 'widgets/tutor_tile.dart';
import 'theme.dart';

void main() => runApp(const EduMatchApp());

class EduMatchApp extends StatelessWidget {
  const EduMatchApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'EduMatch',
      debugShowCheckedModeBanner: false,
      theme: buildAppTheme(),
      home: const TutorsPage(),
    );
  }
}

// ─────────────────────────────────────────────
//  Tutors Page
// ─────────────────────────────────────────────

class TutorsPage extends StatefulWidget {
  const TutorsPage({super.key});

  @override
  State<TutorsPage> createState() => _TutorsPageState();
}

class _TutorsPageState extends State<TutorsPage> {
  late Future<List<Tutor>> _future;

  @override
  void initState() {
    super.initState();
    _future = ApiService.fetchTutors();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      // ── Custom AppBar ──────────────────────────────────────
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(88),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
            child: Row(
              children: [
                // Logo pill
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(
                    color: AppColors.deepBlue,
                    borderRadius: BorderRadius.circular(50),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Text('🎓', style: TextStyle(fontSize: 16)),
                      const SizedBox(width: 6),
                      Text(
                        'EduMatch',
                        style: GoogleFonts.nunito(
                          fontWeight: FontWeight.w900,
                          fontSize: 16,
                          color: Colors.white,
                          letterSpacing: -0.3,
                        ),
                      ),
                    ],
                  ),
                ),
                const Spacer(),
                // Notification button
                Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(14),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.07),
                        blurRadius: 12,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: const Icon(
                    Icons.notifications_none_rounded,
                    color: AppColors.deepBlue,
                    size: 22,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),

      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // ── Header section ─────────────────────────────────
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 8, 20, 4),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Find Your\nPerfect Tutor ✨',
                  style: AppTextStyles.displayBold,
                ),
                const SizedBox(height: 6),
                Text(
                  'Browse top-rated educators near you',
                  style: AppTextStyles.appBarSub,
                ),
                const SizedBox(height: 16),
                // Search field
                Container(
                  height: 50,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(18),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.06),
                        blurRadius: 16,
                        offset: const Offset(0, 4),
                      ),
                    ],
                  ),
                  child: Row(
                    children: [
                      const SizedBox(width: 14),
                      Icon(Icons.search_rounded,
                          color: Colors.grey.shade400, size: 22),
                      const SizedBox(width: 10),
                      Text('Search tutors, subjects...',
                          style: AppTextStyles.bodyMuted),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // ── Tutor list ──────────────────────────────────────
          Expanded(
            child: FutureBuilder<List<Tutor>>(
              future: _future,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(
                    child: CircularProgressIndicator(
                      color: AppColors.deepBlue,
                      strokeWidth: 3,
                    ),
                  );
                }
                if (snapshot.hasError) {
                  return Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Text('😕', style: TextStyle(fontSize: 48)),
                        const SizedBox(height: 12),
                        Text(
                          'Oops! Could not load tutors.',
                          style: AppTextStyles.cardTitle,
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${snapshot.error}',
                          style: AppTextStyles.bodyMuted,
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  );
                }
                final tutors = snapshot.data ?? [];
                if (tutors.isEmpty) {
                  return Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        const Text('🔍', style: TextStyle(fontSize: 48)),
                        const SizedBox(height: 12),
                        Text('No tutors found', style: AppTextStyles.cardTitle),
                      ],
                    ),
                  );
                }
                return ListView.builder(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  itemCount: tutors.length,
                  itemBuilder: (context, i) =>
                      TutorTile(tutor: tutors[i], index: i),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}