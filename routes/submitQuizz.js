const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/', (req, res) => {
  saveAnswers(req.body)
      .then(()=> {
          res.status(200).send();
      })
      .catch((err)=> {
          res.status(400).send({message: err})
      });
});

const answersSchema = new mongoose.Schema({
    userID : String,
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