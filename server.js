const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // to serve the HTML file

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'GokulMysql@2004',
  database: 'student_information'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error: ', err);
    return;
  }
  console.log('MySQL connected...');
});

app.post('/addStudent', (req, res) => {
  const { studentId, studentName, grade, dateOfBirth, address } = req.body;
  const sql = 'INSERT INTO students (studentId, studentName, grade, dateOfBirth, address) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [studentId, studentName, grade, dateOfBirth, address], (err, result) => {
    if (err) {
      console.error('Error adding student: ', err);
      res.status(500).json({ message: 'Error adding student' });
      return;
    }
    res.json({ message: 'Student added successfully' });
  });
});

app.put('/updateStudent/:studentId', (req, res) => {
  const { studentId } = req.params;
  const { studentName, grade, dateOfBirth, address } = req.body;
  const sql = 'UPDATE students SET studentName = ?, grade = ?, dateOfBirth = ?, address = ? WHERE studentId = ?';
  db.query(sql, [studentName, grade, dateOfBirth, address, studentId], (err, result) => {
    if (err) {
      console.error('Error updating student: ', err);
      res.status(500).json({ message: 'Error updating student' });
      return;
    }
    res.json({ message: 'Student updated successfully' });
  });
});

app.delete('/deleteStudent/:studentId', (req, res) => {
  const { studentId } = req.params;
  const sql = 'DELETE FROM students WHERE studentId = ?';
  db.query(sql, [studentId], (err, result) => {
    if (err) {
      console.error('Error deleting student: ', err);
      res.status(500).json({ message: 'Error deleting student' });
      return;
    }
    res.json({ message: 'Student deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
