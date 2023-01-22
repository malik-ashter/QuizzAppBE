const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    let titles = {
        titleEnglish: questionsEnglish[0].title,
        titleUrdu: questionsUrdu[0].title,
        showAnswers: questionsEnglish[0].showAnswers
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