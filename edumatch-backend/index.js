const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const tutors = [
  { id: 1, name: 'Aisha Khan', subjects: ['Math', 'Physics'], ratePerHour: 15, city: 'Lahore' },
  { id: 2, name: 'Ravi Kumar', subjects: ['Chemistry', 'Biology'], ratePerHour: 12, city: 'Delhi' },
];

app.get('/api/tutors', (req, res) => res.json({ data: tutors }));
// alternate route to match the requested endpoint name in the prompt
app.get('/api/tentors', (req, res) => res.json({ data: tutors }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
