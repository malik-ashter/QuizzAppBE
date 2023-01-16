const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({origin: '*'}));
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

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
