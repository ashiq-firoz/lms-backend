const {BookModel} = require('../models/bookModel');

const getPopularBooks = async (req, res) => {
    try {
        const books = await BookModel.find({});
        res.json(books);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createBook = async (req, res) => {
    const book = new BookModel({
        title: req.body.title,
        author: req.body.author,
        img: req.body.img,
        available: req.body.available,
        genre: req.body.genre
    });
    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
}

const updateBook = async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.id);
        if (req.body.title) {
            book.title = req.body.title;
        }
        if (req.body.author) {
            book.author = req.body.author;
        }
        if (req.body.img) {
            book.img = req.body.img;
        }
        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteBook = async (req, res) => {
    try {
        const book = await BookModel.findByIdAndDelete(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = { getPopularBooks, getBookById, createBook, updateBook, deleteBook };