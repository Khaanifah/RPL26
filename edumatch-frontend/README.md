# edumatch-frontend

Flutter starter snippet to fetch tutors from the backend.

Create the project:

```bash
flutter create edumatch-frontend
```

Add dependency in `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  http: ^0.13.5
```

Replace `lib/main.dart` with the example in this workspace.

Run:

```bash
cd edumatch-frontend
flutter run
```

Notes:
- If running on Android emulator and the backend is on the host machine, use `10.0.2.2` instead of `localhost` for the API base URL.
- Ensure the backend is running (`cd edumatch-backend && npm run dev`) before launching the app.
