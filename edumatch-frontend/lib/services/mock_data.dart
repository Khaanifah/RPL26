import '../models/tutor.dart';
import '../models/booking_session.dart';

abstract class MockData {
  // ─── Tutors ────────────────────────────────────────────────────────────────
  static final List<Tutor> tutors = [
    const Tutor(
      id: 1,
      name: 'Aisha Rahma',
      subjects: ['Mathematics', 'Physics', 'Calculus'],
      ratePerHour: 85,
      city: 'Jakarta',
      bio:
          'Passionate STEM educator with 6 years of experience helping students '
          'unlock their love for Mathematics and Physics. I believe every student '
          'has a unique learning style — my sessions are fully adaptive.',
      rating: 4.9,
      reviewCount: 124,
      avatarEmoji: '🌟',
      availableSlots: [
        'Mon  09:00 – 10:00',
        'Mon  14:00 – 15:00',
        'Tue  10:00 – 11:00',
        'Wed  08:00 – 09:00',
        'Thu  16:00 – 17:00',
        'Sat  09:00 – 10:00',
      ],
    ),
    const Tutor(
      id: 2,
      name: 'Budi Santoso',
      subjects: ['English', 'Literature', 'IELTS Prep'],
      ratePerHour: 70,
      city: 'Bandung',
      bio:
          'Certified English teacher and IELTS coach with a band score of 8.5. '
          'I've helped over 200 students achieve their target scores. My lessons '
          'are fun, communicative, and results-driven.',
      rating: 4.8,
      reviewCount: 98,
      avatarEmoji: '📖',
      availableSlots: [
        'Tue  13:00 – 14:00',
        'Wed  15:00 – 16:00',
        'Fri  09:00 – 10:00',
        'Fri  11:00 – 12:00',
        'Sun  10:00 – 11:00',
      ],
    ),
    const Tutor(
      id: 3,
      name: 'Clara Dewi',
      subjects: ['Chemistry', 'Biology', 'Science'],
      ratePerHour: 90,
      city: 'Surabaya',
      bio:
          'PhD candidate in Biochemistry at ITS. I make complex science concepts '
          'approachable and memorable through visual storytelling and real-world '
          'experiments. Great for high-school & university students.',
      rating: 5.0,
      reviewCount: 57,
      avatarEmoji: '🔬',
      availableSlots: [
        'Mon  16:00 – 17:00',
        'Tue  08:00 – 09:00',
        'Thu  14:00 – 15:00',
        'Sat  13:00 – 14:00',
        'Sun  09:00 – 10:00',
      ],
    ),
    const Tutor(
      id: 4,
      name: 'David Kurnia',
      subjects: ['Programming', 'Python', 'Web Dev'],
      ratePerHour: 120,
      city: 'Yogyakarta',
      bio:
          'Full-stack developer turned educator. I teach Python, JavaScript, and '
          'modern web frameworks with a project-based approach. '
          'Build real apps from day one!',
      rating: 4.7,
      reviewCount: 203,
      avatarEmoji: '💻',
      availableSlots: [
        'Mon  19:00 – 20:00',
        'Wed  19:00 – 20:00',
        'Thu  18:00 – 19:00',
        'Fri  20:00 – 21:00',
        'Sat  10:00 – 11:00',
        'Sat  15:00 – 16:00',
      ],
    ),
    const Tutor(
      id: 5,
      name: 'Eka Putri',
      subjects: ['Indonesian', 'History', 'Social Studies'],
      ratePerHour: 60,
      city: 'Medan',
      bio:
          'Dedicated humanities teacher with 8 years in secondary education. '
          'I specialise in making history and social studies come alive through '
          'stories, debates, and engaging discussions.',
      rating: 4.9,
      reviewCount: 76,
      avatarEmoji: '🏛️',
      availableSlots: [
        'Mon  10:00 – 11:00',
        'Tue  14:00 – 15:00',
        'Wed  10:00 – 11:00',
        'Fri  13:00 – 14:00',
        'Sun  14:00 – 15:00',
      ],
    ),
    const Tutor(
      id: 6,
      name: 'Fariz Hakim',
      subjects: ['Music Theory', 'Guitar', 'Piano'],
      ratePerHour: 75,
      city: 'Bali',
      bio:
          'Professional musician and conservatory graduate. Whether you are a '
          'complete beginner or working on advanced repertoire, I will guide you '
          'with patience and creativity.',
      rating: 4.6,
      reviewCount: 41,
      avatarEmoji: '🎸',
      availableSlots: [
        'Tue  17:00 – 18:00',
        'Thu  17:00 – 18:00',
        'Fri  15:00 – 16:00',
        'Sat  11:00 – 12:00',
        'Sun  16:00 – 17:00',
      ],
    ),
  ];

  // ─── Booking Sessions ──────────────────────────────────────────────────────
  static final List<BookingSession> sessions = [
    // ── Active (Upcoming) ──────────────────────────────────────────────────
    const BookingSession(
      id: 101,
      tutorId: 1,
      tutorName: 'Aisha Rahma',
      studentName: 'Rizky Maulana',
      subject: 'Mathematics',
      date: 'Mon, 26 May 2026',
      timeSlot: '09:00 – 10:00',
      ratePerHour: 85,
      status: SessionStatus.active,
      tutorAvatarEmoji: '🌟',
    ),
    const BookingSession(
      id: 102,
      tutorId: 4,
      tutorName: 'David Kurnia',
      studentName: 'Rizky Maulana',
      subject: 'Python',
      date: 'Wed, 28 May 2026',
      timeSlot: '19:00 – 20:00',
      ratePerHour: 120,
      status: SessionStatus.active,
      tutorAvatarEmoji: '💻',
    ),
    // ── Pending ────────────────────────────────────────────────────────────
    const BookingSession(
      id: 201,
      tutorId: 2,
      tutorName: 'Budi Santoso',
      studentName: 'Siti Nurhaliza',
      subject: 'IELTS Prep',
      date: 'Fri, 30 May 2026',
      timeSlot: '09:00 – 10:00',
      ratePerHour: 70,
      status: SessionStatus.pending,
      tutorAvatarEmoji: '📖',
    ),
    const BookingSession(
      id: 202,
      tutorId: 3,
      tutorName: 'Clara Dewi',
      studentName: 'Ahmad Fauzi',
      subject: 'Chemistry',
      date: 'Sat, 31 May 2026',
      timeSlot: '13:00 – 14:00',
      ratePerHour: 90,
      status: SessionStatus.pending,
      tutorAvatarEmoji: '🔬',
    ),
    const BookingSession(
      id: 203,
      tutorId: 5,
      tutorName: 'Eka Putri',
      studentName: 'Dewi Rahayu',
      subject: 'History',
      date: 'Sun, 01 Jun 2026',
      timeSlot: '14:00 – 15:00',
      ratePerHour: 60,
      status: SessionStatus.pending,
      tutorAvatarEmoji: '🏛️',
    ),
    // ── Past (Completed) ───────────────────────────────────────────────────
    const BookingSession(
      id: 301,
      tutorId: 1,
      tutorName: 'Aisha Rahma',
      studentName: 'Rizky Maulana',
      subject: 'Physics',
      date: 'Mon, 12 May 2026',
      timeSlot: '14:00 – 15:00',
      ratePerHour: 85,
      status: SessionStatus.past,
      tutorAvatarEmoji: '🌟',
    ),
    const BookingSession(
      id: 302,
      tutorId: 6,
      tutorName: 'Fariz Hakim',
      studentName: 'Rizky Maulana',
      subject: 'Guitar',
      date: 'Sat, 10 May 2026',
      timeSlot: '11:00 – 12:00',
      ratePerHour: 75,
      status: SessionStatus.past,
      tutorAvatarEmoji: '🎸',
    ),
  ];
}