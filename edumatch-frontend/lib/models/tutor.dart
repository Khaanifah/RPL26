class Tutor {
  final int id;
  final String name;
  final List<String> subjects;
  final double ratePerHour;
  final String city;

  Tutor({required this.id, required this.name, required this.subjects, required this.ratePerHour, required this.city});

  factory Tutor.fromJson(Map<String, dynamic> json) => Tutor(
    id: json['id'] as int,
    name: json['name'] as String,
    subjects: (json['subjects'] as List).map((s) => s.toString()).toList(),
    ratePerHour: (json['ratePerHour'] is int) ? (json['ratePerHour'] as int).toDouble() : (json['ratePerHour'] as double),
    city: json['city'] as String,
  );
}
