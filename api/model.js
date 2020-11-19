const mongoose = require('mongoose');

const booksModel = mongoose.model('books', new mongoose.Schema({
    bookId: { type: String, required: true, unique: true },
    title: String,
    averageRating: Number,
    authors: Array,
    description: String,
    categories: Array,
    publisher: String,
    publishedDate: String,
    previewLink: String,
    coverImage: String
}, { timestamps: true }))

module.exports.booksModel = booksModel