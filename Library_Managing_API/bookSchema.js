const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    book_title: String,
    book_author: String,
    book_description: String,
    book_release_year: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;