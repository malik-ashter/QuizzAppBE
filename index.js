const error = require('./middleware/error');
const logger = require('./utils/logger.js');
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();
const morganMiddleware = require("./middleware/morgan.js");

const questions = require('./routes/questions');
const titles = require('./routes/titles');
const submitForm = require('./routes/submitForm');
const submitQuizz = require('./routes/submitQuizz');
const quizzResults = require('./routes/quizzResults');



app.use(cors({origin: '*'}));
app.use(morganMiddleware);
app.use(express.json());
app.use('/api/quizz/data', titles);
app.use('/api/user/insert', submitForm);
app.use('/api/quizz/questions', questions);
app.use('/api/quizz/submit', submitQuizz);
app.use('/api/quizz/results', quizzResults);
const port = process.env.PORT || 3000;

global.questionsUrdu;
global.questionsEnglish;

fs.readFile('./resources/tmLwikCHkxwGwQ1Xjy3UVn-ur.json', (err, data) => {
    if (err) next(err);
    questionsUrdu = JSON.parse(data);
});

fs.readFile('./resources/f4EnJdt9Rd4kM3jrJRgtEo-en.json', (err, data) => {
    if (err) next(err);
    questionsEnglish = JSON.parse(data);
});

app.get('/', (req, res)=>{
    res.send('Hello from Rest!');
});
app.use(error);
mongoose.connect(process.env.MONGODB_URL)
    .then((result) => {
        logger.info('Connected to database...');
        app.listen(port, () => logger.info(`Listening on port ${port}..`));
    })
    .catch((error) => {logger.error(error);});

