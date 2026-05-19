import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/tutor.dart';

class ApiService {
  static const String _base = 'http://localhost:3000';

  static Future<List<Tutor>> fetchTutors() async {
    final url = Uri.parse('$_base/api/tutors');
    final res = await http.get(url);
    if (res.statusCode == 200) {
      final body = json.decode(res.body);
      final list = (body['data'] as List).cast<Map<String, dynamic>>();
      return list.map((e) => Tutor.fromJson(e)).toList();
    }
    throw Exception('Failed to load tutors: ${res.statusCode}');
  }
}
