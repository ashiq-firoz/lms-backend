const express = require('express');
const router = express.Router();
const transactionModel = require('../models/transactionModel');
const bookModel = require('../models/bookModel');
const requireAuth = require('../middleware/requireAuth');

// router.use(requireAuth);

router.get('/all', async (req, res) => {
    try {
        const transactions = await transactionModel.find();
        res.json(transactions);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const transactions = await transactionModel.find({ borrowerId: req.params.id });
        res.json(transactions);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/add', async (req, res) => {
    const { bookId, borrowerId, fromDate, toDate } = req.body;
    const transaction = new transactionModel({
        bookId,
        borrowerId,
        fromDate,
        toDate
    });
    try {
        await transaction.save();
        const book = await bookModel.findById(req.params.id);
        book.available = "false";
        await book.save();
        res.json({t: transaction, b: book});
    } catch (error) {
        res.status(400).json(error);
    }
});

router.patch('/:id', async (req, res) => {
    const { returnDate } = req.body;
    try {
        const transaction = await transactionModel.findById(req.params.id);
        transaction.returnDate = returnDate;
        transaction.transactionStatus = 'Returned';
        const book = await bookModel.findById(transaction.bookId);
        book.available = true;
        await book.save();
        await transaction.save();
        res.json(transaction);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports = router;