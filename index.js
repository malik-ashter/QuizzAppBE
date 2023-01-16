const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({origin: '*'}));
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(function (req, res, next) { //before the routes are defined
    const allowedOrigins = ['http://islamicquizz.rf.gd', 'http://127.0.0.1:5500'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const questions = require('./routes/questions');
const titles = require('./routes/titles');
const submitForm = require('./routes/submitForm');
const submitQuizz = require('./routes/submitQuizz');

app.use(express.json());
app.use('/api/questions', questions);
app.use('/api/titles', titles);
app.use('/api/submit-form', submitForm);
app.use('/api/submit-quizz', submitQuizz);

const port = process.env.PORT || 3000;

global.questionsUrdu;
global.questionsEnglish;
fs.readFile('./resources/questions-urdu.json', (err, data) => {
    if (err) throw err;
    questionsUrdu = JSON.parse(data);
    console.log(questionsUrdu);
});

fs.readFile('./resources/questions-english.json', (err, data) => {
    if (err) throw err;
    questionsEnglish = JSON.parse(data);
    console.log(questionsEnglish);
});

app.get('/', (req, res)=>{
    res.send('Hello from Rest!');
});

app.listen(port, () => console.log(`Listening on port ${port}..`));

mongoose.connect(process.env.MONGODB_URL)
.then(()=> {
    console.log("Connected to db");
});
