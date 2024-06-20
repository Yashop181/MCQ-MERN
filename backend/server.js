const express = require('express');
const mongoose = require('mongoose')
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config()

const port = process.env.PORT || 8000;

mongoose.connect("mongodb://127.0.0.1:27017/quizapp").then(()=> console.log('mongodb connected')).catch(err =>console.log(err));

const quizzesRouter = require('./routes/quizzes');
app.use('/quizzes',quizzesRouter);

app.listen(port ,()=>{
    console.log(`Server is running on port ${port}`);
})