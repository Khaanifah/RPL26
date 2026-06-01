class Tutor {
  final int id;
  final String name;
  final List<String> subjects;
  final double ratePerHour;
  final String city;
  final String bio;
  final double rating;
  final int reviewCount;
  final String avatarEmoji;
  final List<String> availableSlots;

  const Tutor({
    required this.id,
    required this.name,
    required this.subjects,
    required this.ratePerHour,
    required this.city,
    this.bio = '',
    this.rating = 5.0,
    this.reviewCount = 0,
    this.avatarEmoji = '📚',
    this.availableSlots = const [],
  });

  factory Tutor.fromJson(Map<String, dynamic> json) => Tutor(
        id: json['id'] as int,
        name: json['name'] as String,
        subjects:
            (json['subjects'] as List).map((s) => s.toString()).toList(),
        ratePerHour: (json['ratePerHour'] is int)
            ? (json['ratePerHour'] as int).toDouble()
            : (json['ratePerHour'] as double),
        city: json['city'] as String,
        bio: json['bio'] as String? ?? '',
        rating: (json['rating'] as num?)?.toDouble() ?? 5.0,
        reviewCount: json['reviewCount'] as int? ?? 0,
        avatarEmoji: json['avatarEmoji'] as String? ?? '📚',
        availableSlots: json['availableSlots'] != null
            ? (json['availableSlots'] as List)
                .map((s) => s.toString())
                .toList()
            : const [],
      );
}