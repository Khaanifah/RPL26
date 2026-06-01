import 'package:flutter/material.dart';
import '../models/tutor.dart';
import '../theme.dart';

/// A Bento-Box style card for displaying a single tutor.
///
/// The [index] drives the accent colour so every card in the list
/// gets a unique, systematic colour from [AppColors.cardAccents].
class TutorTile extends StatelessWidget {
  final Tutor tutor;

  /// Position in the list – used to pick a card accent colour.
  final int index;

  const TutorTile({required this.tutor, required this.index, super.key});

  @override
  Widget build(BuildContext context) {
    final accentColor =
        AppColors.cardAccents[index % AppColors.cardAccents.length];

    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(28),
          // Soft, diffused paper-cutout shadow
          boxShadow: [
            BoxShadow(
              color: accentColor.withOpacity(0.25),
              blurRadius: 20,
              spreadRadius: 0,
              offset: const Offset(0, 8),
            ),
            BoxShadow(
              color: Colors.black.withOpacity(0.04),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(28),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // ── Coloured accent banner ─────────────────────
              _AccentBanner(accentColor: accentColor, tutor: tutor),

              // ── Card body ──────────────────────────────────
              Padding(
                padding: const EdgeInsets.fromLTRB(18, 14, 18, 18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Subjects as pill chips
                    _SubjectChips(
                      subjects: tutor.subjects,
                      baseIndex: index,
                    ),
                    const SizedBox(height: 14),

                    // Bottom row: city + rate
                    Row(
                      children: [
                        // City badge
                        Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(
                              Icons.location_on_rounded,
                              size: 14,
                              color: accentColor,
                            ),
                            const SizedBox(width: 4),
                            Text(tutor.city, style: AppTextStyles.bodyMuted),
                          ],
                        ),
                        const Spacer(),
                        // Rate badge
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 14, vertical: 8),
                          decoration: BoxDecoration(
                            color: accentColor.withOpacity(0.15),
                            borderRadius: BorderRadius.circular(50),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                '\$${tutor.ratePerHour.toStringAsFixed(0)}',
                                style: AppTextStyles.priceBadge.copyWith(
                                  color: accentColor
                                      .withOpacity(1)
                                      .withRed(_clamp(accentColor.red - 30))
                                      .withGreen(_clamp(accentColor.green - 30))
                                      .withBlue(_clamp(accentColor.blue - 30)),
                                ),
                              ),
                              Text(' /hr', style: AppTextStyles.bodyMuted),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  int _clamp(int v) => v.clamp(0, 255);
}

// ─────────────────────────────────────────────────────────────────────────────
//  Accent banner (top section of the Bento card)
// ─────────────────────────────────────────────────────────────────────────────

class _AccentBanner extends StatelessWidget {
  const _AccentBanner({required this.accentColor, required this.tutor});

  final Color accentColor;
  final Tutor tutor;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(18, 16, 18, 14),
      decoration: BoxDecoration(
        // Subtle gradient wash using the card accent
        gradient: LinearGradient(
          colors: [
            accentColor.withOpacity(0.18),
            accentColor.withOpacity(0.06),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Row(
        children: [
          // Avatar circle
          Container(
            width: 52,
            height: 52,
            decoration: BoxDecoration(
              color: accentColor,
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                // First letter of each word (max 2 chars)
                _initials(tutor.name),
                style: const TextStyle(
                  fontFamily: 'Nunito',
                  fontWeight: FontWeight.w900,
                  fontSize: 18,
                  color: Colors.white,
                ),
              ),
            ),
          ),
          const SizedBox(width: 14),
          // Name + "Tutor" label
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(tutor.name, style: AppTextStyles.cardTitle),
                const SizedBox(height: 2),
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: accentColor.withOpacity(0.3),
                        borderRadius: BorderRadius.circular(50),
                      ),
                      child: Text(
                        '✦  Tutor',
                        style: AppTextStyles.chip.copyWith(
                          color: AppColors.deepBlue.withOpacity(0.75),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          // Star rating decoration
          Column(
            children: [
              const Text('⭐', style: TextStyle(fontSize: 18)),
              Text(
                '5.0',
                style: AppTextStyles.chip.copyWith(
                  color: AppColors.deepBlue,
                  fontSize: 11,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _initials(String name) {
    final parts = name.trim().split(RegExp(r'\s+'));
    if (parts.isEmpty) return '?';
    if (parts.length == 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  Subject chip row
// ─────────────────────────────────────────────────────────────────────────────

class _SubjectChips extends StatelessWidget {
  const _SubjectChips({required this.subjects, required this.baseIndex});

  final List<String> subjects;
  final int baseIndex;

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: List.generate(subjects.length, (i) {
        final colorIdx = (baseIndex + i) % AppColors.chipColors.length;
        return Container(
          padding:
              const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
          decoration: BoxDecoration(
            color: AppColors.chipColors[colorIdx],
            borderRadius: BorderRadius.circular(50),
          ),
          child: Text(
            subjects[i],
            style: AppTextStyles.chip.copyWith(
              color: AppColors.chipTextColors[colorIdx],
            ),
          ),
        );
      }),
    );
  }
}