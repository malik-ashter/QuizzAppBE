const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    let titles = {
        title : questionsUrdu[0].title,
        quizzID : 'f4EnJdt9Rd4kM3jrJRgtEo'
    };
    res.send(titles);
});

router.get('/en', (req, res)=>{
    let title = {
        titleEnglish: questionsEnglish[0].title,
        showAnswers: questionsEnglish[0].showAnswers
    };
    console.log(titleEnglish);
    res.send(title);
});

module.exports = router;