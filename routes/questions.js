const express = require('express');
const router = express.Router();

router.get('/ur', (req, res)=>{
    if(!(questionsUrdu[0].showAnswers == 'yes')) {
        questionsUrdu.forEach(element => {
            delete element["answer"];
        });
    }
    res.send(questionsUrdu);
});

router.get('/en', (req, res)=>{
    if(!(questionsEnglish[0].showAnswers == 'yes')) {
        questionsEnglish.forEach(element => {
            delete element["answer"];
        });
    }
    res.send(questionsEnglish);
});

module.exports = router;