const express = require('express');
const router = express.Router();

const {createBook, updateBook, deleteBook} = require('../controllers/bookController');

router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;