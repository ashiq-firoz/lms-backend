const { QueryModel, AnswerModel, BookModel } = require('../models/bookModel');

const createQuery = async (req, res) => {
    const exsistingQuery = await QueryModel.findOne({user_name: req.body.user_name, query: req.body.query});
    if(exsistingQuery) {
        res.status(400).json({message: 'Query already exists'});
        return;
    }
    const query = new QueryModel({
        user_name: req.body.user_name,
        query: req.body.query
    });
    try {
        const newQuery = await query.save();
        const book = await BookModel.findById(req.params.id);
        book.queries.push(newQuery);
        const updatedBook = await book.save();

        res.status(201).json(updatedBook);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
};

const createAnswer = async (req, res) => {
    const answer = new AnswerModel({
        user_name: req.body.user_name,
        answer: req.body.answer,
        queryId: req.body.qid
    });
    try {
        const newAnswer = await answer.save();
        const book = await BookModel.findById(req.params.id);
        const query = book.queries.find(query => query._id.toString() === req.params.qid);
        if (!query) {
            res.status(404).json({ message: 'Query not found' });
            return;
        }
        query.answers.push(newAnswer);
        const updatedBook = await book.save();
        res.status(201).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const sendQuery = async (req, res) => {
    try{
        const query = await QueryModel.findById(req.params.id);
        res.status(200).json(query);
    } catch (error) {
        res.status(404).json({message: error.message});
    }

};

module.exports = { createQuery, createAnswer, sendQuery};