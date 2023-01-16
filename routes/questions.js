const express = require('express');
const router = express.Router();

router.get('/ur', (req, res)=>{
    res.send(questionsUrdu);
});

router.get('/en', (req, res)=>{
    res.send(questionsEnglish);
});

module.exports = router;