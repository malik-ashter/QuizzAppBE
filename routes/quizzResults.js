const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('./submitQuizz');
var Answer = mongoose.model('Answer');

let questions;

router.get('/', async (req, res, next) => {
    const results = await getResults();
    try {
        const results = await getResults();
        res.json(results);
    } catch(error) {
        next(error);
    }
});

async function getResults() {
    return Answer
        .find()
        .populate('user', 'userName mobile country quizzLanguage -_id')
        .select('score answers user -_id')
        .sort({'score' : -1});
}

module.exports = router;