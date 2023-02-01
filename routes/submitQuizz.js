const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



router.post('/', async(req, res) => {
    let questions;
    if(req.body.language == 'ur') {
        questions = questionsUrdu;
    }
    let answersToSave = req.body;
    let score = calculateScore(answersToSave.answers, questions);
    answersToSave.score = score;
    if(!(questions[0].showAnswers.toLowerCase() == 'yes')) {
        try{
            await saveAnswers(answersToSave);
            res.status(200).send();
        } catch(err) {
            console.log(err);
            res.status(400).send({message: err})
        }
    } else {
        res.status(200).json({score: score});
    }
});

function calculateScore(answers, questions) {
    let score = 0;
    for(let i = 1; i < questions.length; i++) {
        let ans = answers.find(element => {
            let qNum = element.question;
            return qNum == i;
        });
        if(ans && ans.answer == questions[i].answer) {
            score += parseInt(questions[i].points);
        }
    }
    return score;
}

const answersSchema = new mongoose.Schema({
    quizzID : String,
    language : String,
    userID : String,
    score : Number,
    answers : [
        {
          question: String,
          answer: String
        }
      ]
});

const Answer = mongoose.model('Answer', answersSchema);

async function saveAnswers(answersToSave) {
    const answer =  new Answer(answersToSave);
    const result = await answer.save();
    return result._id;
}
module.exports = router;