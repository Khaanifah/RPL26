import 'package:flutter/material.dart';
import '../models/tutor.dart';

class TutorTile extends StatelessWidget {
  final Tutor tutor;
  const TutorTile({required this.tutor, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(tutor.name),
      subtitle: Text(tutor.subjects.join(', ')),
      trailing: Text('\$${tutor.ratePerHour.toStringAsFixed(0)}/hr'),
    );
  }
}
