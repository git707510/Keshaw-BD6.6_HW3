const express = require('express');
const cors = require('cors');
const { getAllBooks, getBookById } = require('./controllers');

const app = express();

app.use(express.json());
app.use(cors());

// - Exercise 1: Retrieve All Books -

app.get('/books', (req, res) => {
  try {
    const books = getAllBooks();
    if (books.length === 0) {
      return res.status(400).json({ message: 'books not found' });
    }
    return res.status(200).json({ books });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// - Exercise 2: Retrieve Book by ID -

app.get('/books/details/:id', (req, res) => {
  try {
    const bookid = parseInt(req.params.id);
    const book = getBookById(bookid);
    if (!book) {
      return res
        .status(400)
        .json({ message: 'Book not found by given bookid - ' + bookid });
    }
    return res.status(200).json({ book });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = { app };
