const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const logger = require('../utils/logger');



router.post('/', async(req, res, next) => {
    let questions;
    if(req.body.language.trim().toLowerCase() == 'urdu') {
        questions = questionsUrdu;
    }
    let answersToSave = req.body;
    let score = calculateScore(answersToSave.answers, questions);
    answersToSave.score = score;
    if(req.body.suggestions) {
        try {
            await saveSuggestions(answersToSave);
        } catch(err) {
            logger.error(err);
        }
    }
    if(!(questions[0].showAnswers.toLowerCase() == 'yes')) {
        Answer.exists({user : req.body.user, quizzID : req.body.quizzID}, async (err, doc) => {
            if (err){
                next(err);
            }else{
                if(doc) {
                    res.status(400).send('Attention! You have already submitted this quizz. You can participate only once in this quizz.');
                } else {
                    try{ 
                        await saveAnswers(answersToSave);
                        res.status(200).send('success');
                    } catch(err) {
                        next(err);
                    }
                }
            }
        });
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
    user :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    score : Number,
    answers : String
},{ timestamps: true });

const Answer = mongoose.model('Answer', answersSchema);

async function saveAnswers(answersToSave) {
    answersToSave.answers = convertToString(answersToSave.answers);
    const answer =  new Answer(answersToSave);
    const result = await answer.save();
    return result._id;
}

function convertToString(answers) {
    return answers.map(function(answer) {
        return answer['question'] + ':' + answer['answer'];
      }).toString();
}

const suggestSchema = new mongoose.Schema({
    user :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    suggestions: String
},{ timestamps: true });

const Suggestion = mongoose.model('Suggestion', suggestSchema);
async function saveSuggestions(answersToSave) {
    const suggest =  new Suggestion(answersToSave);
    const result = await suggest.save();
    return result._id;
}

module.exports = Answer;
module.exports = router;