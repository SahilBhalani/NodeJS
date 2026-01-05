const express = require('express');
const connectDB = require('./config');
const app = express();
const Book = require('./bookSchema');


app.use(express.json());
connectDB();

// Implementing CRUD Operations

app.post('/api/books', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(book);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/books/', async (req, res) => {
  try {
    await Book.deleteMany();
    res.json({ message: 'All Books Deleted Successfully!' });
  } catch (error) {
    console.error('Error', error.message);
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Successfully', DeletedBook: book });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
