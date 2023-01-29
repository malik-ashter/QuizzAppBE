const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({origin: '*'}));
const fs = require('fs');
const mongoose = require('mongoose');
const short = require('short-uuid');
require('dotenv').config();

const questions = require('./routes/questions');
const titles = require('./routes/titles');
const submitForm = require('./routes/submitForm');
const submitQuizz = require('./routes/submitQuizz');

app.use(express.json());
app.use('/api/quizz/data', titles);
app.use('/api/user/insert', submitForm);
app.use('/api/quizz/questions', questions);
app.use('/api/quizz/submit', submitQuizz);

const port = process.env.PORT || 3000;

global.questionsUrdu;
global.questionsEnglish;
fs.readFile('./resources/f4EnJdt9Rd4kM3jrJRgtEo-ur.json', (err, data) => {
    if (err) throw err;
    questionsUrdu = JSON.parse(data);
    console.log(questionsUrdu);
});

fs.readFile('./resources/f4EnJdt9Rd4kM3jrJRgtEo-en.json', (err, data) => {
    if (err) throw err;
    questionsEnglish = JSON.parse(data);
    console.log(questionsEnglish);
});

app.get('/', (req, res)=>{
    res.send('Hello from Rest!');
});

mongoose.connect(process.env.MONGODB_URL + 'quizz')
.then(()=> {
    console.log("Connected to db");
})
.catch(err => {
    console.log(err);
});

app.listen(port, () => console.log(`Listening on port ${port}..`));

