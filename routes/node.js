const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define routes
app.get('/', (req, res) => res.send('Hello World!'));

// Get all quizzes
app.get('/quizzes', (req, res) => {
  const Quiz = mongoose.model('Quiz', { name: String });

  Quiz.find({}, (err, quizzes) => {
    if (err) {
      res.send(err);
    }

    res.json(quizzes);
  });
});

// Start server
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
