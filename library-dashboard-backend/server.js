// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Author = require('./models/Author');
const Book = require('./models/Book');
require("dotenv").config();


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURI = process.env.MONGODB;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
// Authors CRUD operations
app.get('/authors', (req, res) => {
  Author.find()
    .then(authors => res.json(authors))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.post('/authors', (req, res) => {
  const newAuthor = new Author(req.body);
  newAuthor.save()
    .then(() => res.json(newAuthor))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.put('/authors/:id', (req, res) => {
  Author.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedAuthor => res.json(updatedAuthor))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.delete('/authors/:id', (req, res) => {
  Author.findByIdAndDelete(req.params.id)
    .then(() => res.json('Author deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Books CRUD operations
app.get('/books', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.post('/books', (req, res) => {
  const newBook = new Book(req.body);
  newBook.save()
    .then(() => res.json(newBook))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.put('/books/:id', (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedBook => res.json(updatedBook))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.delete('/books/:id', (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.json('Book deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
