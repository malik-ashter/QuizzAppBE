const express = require('express');
const router = express.Router();

router.get('/ur', (req, res)=>{
    let questions = JSON.parse(JSON.stringify(questionsUrdu));
    if(!(questions[0].showAnswers == 'yes')) {
        questions.forEach(element => {
            delete element["answer"];
        });
    }
    res.send(questions);
});

router.get('/en', (req, res)=>{
    let questions = JSON.parse(JSON.stringify(questionsEnglish));
    if(!(questions[0].showAnswers == 'yes')) {
        questions.forEach(element => {
            delete element["answer"];
        });
    }
    res.send(questions);
});

module.exports = router;