const router = require('express').Router();
let Quiz = require('../models/quiz');

router.route('/').get((req,res)=> {
    Quiz.find().then(quizzes => res.json(quizzes)).catch(err => res.status(400).json('Error:'+ err));
});

router.route('/add').post((req,res)=>{
    const title = req.body.title;
    const questions = req.body.questions;
    
    const newQuiz = new Quiz({title,questions});

    newQuiz.save().then(()=>res.json('Quiz added!')).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res)=>{
    Quiz.findById(req.params.id).then(quiz => res.json(quiz)).catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req,res)=>{
    Quiz.findByIdAndDelete(req.params.id).then(()=>res.json('Quiz deleted!')).catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req,res)=>{
    Quiz.findById(req.params.id)
    .then(quiz =>{
        quiz.title = req.body.title;
        quiz.questions = req.body.questions;

        quiz.save()
        .then(()=>res.json('Quiz updated!'))
        .catch(err => res.status(400).json('Error: ' +err))
    })
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id/submit').post((req, res) => {
    const quizId = req.params.id;
    const { answers } = req.body;

    Quiz.findById(quizId)
        .then(quiz => {
            if (!quiz) {
                return res.status(404).json({ error: 'Quiz not found' });
            }

            // Calculate the score
            let score = 0;
            quiz.questions.forEach((question, questionIndex) => {
                if (question.options[answers[questionIndex]]?.isCorrect) {
                    score++;
                }
            });

            // Send the score back in the response
            res.json({ message: 'Quiz submitted successfully', score });
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
