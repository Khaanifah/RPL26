enum SessionStatus { active, pending, past }

extension SessionStatusLabel on SessionStatus {
  String get label {
    switch (this) {
      case SessionStatus.active:
        return 'Upcoming';
      case SessionStatus.pending:
        return 'Pending';
      case SessionStatus.past:
        return 'Completed';
    }
  }
}

class BookingSession {
  final int id;
  final int tutorId;
  final String tutorName;
  final String studentName;
  final String subject;
  final String date;
  final String timeSlot;
  final double ratePerHour;
  final SessionStatus status;
  final String tutorAvatarEmoji;

  const BookingSession({
    required this.id,
    required this.tutorId,
    required this.tutorName,
    required this.studentName,
    required this.subject,
    required this.date,
    required this.timeSlot,
    required this.ratePerHour,
    required this.status,
    required this.tutorAvatarEmoji,
  });
}
