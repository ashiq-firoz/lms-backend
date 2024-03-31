const express = require('express');
const router = express.Router();
const { getPopularBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { createQuery, createAnswer } = require('../controllers/queryController.js');
const requireAuth = require('../middleware/requireAuth');

//router.use(requireAuth);

router.get('/', getPopularBooks);
router.get('/:id', getBookById);

router.post('/:id/query', createQuery);
router.patch('/:id/query', createQuery);
router.patch('/:id/query/:qid', createAnswer);

router.put('/admin/:id', updateBook);

router.delete('/admin/:id', deleteBook);

module.exports = router;