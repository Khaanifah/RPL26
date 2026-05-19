import 'package:flutter/material.dart';
import 'models/tutor.dart';
import 'services/api_service.dart';
import 'widgets/tutor_tile.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) => MaterialApp(title: 'EduMatch', home: TutorsPage());
}

class TutorsPage extends StatefulWidget {
  @override
  _TutorsPageState createState() => _TutorsPageState();
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
      appBar: AppBar(title: Text('Tutors')),
      body: FutureBuilder<List<Tutor>>(
        future: _future,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }
          final tutors = snapshot.data ?? [];
          if (tutors.isEmpty) return Center(child: Text('No tutors found'));
          return ListView.builder(
            itemCount: tutors.length,
            itemBuilder: (context, i) => TutorTile(tutor: tutors[i]),
          );
        },
      ),
    );
  }
}
