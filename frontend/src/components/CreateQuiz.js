import React, { useState } from 'react';
import axios from 'axios';
import "../design/CreateQuiz.css";

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState([{ questionText: '', options: [{ optionText: '', isCorrect: false }] }]);

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', options: [{ optionText: '', isCorrect: false }] }]);
    };

    const addOption = (questionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options.push({ optionText: '', isCorrect: false });
        setQuestions(newQuestions);
    };

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = event.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].options[optionIndex][event.target.name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setQuestions(newQuestions);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const newQuiz = { title, questions };

        axios.post('http://localhost:8000/quizzes/add', newQuiz)
            .then(res => console.log(res.data));

        setTitle('');
        setQuestions([{ questionText: '', options: [{ optionText: '', isCorrect: false }] }]);
    }

    return (
        <div className="create-quiz-container">
            <h3>Create New Quiz</h3>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Title: </label>
                    <input type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex}>
                        <label>Question: </label>
                        <input type="text"
                            required
                            value={question.questionText}
                            onChange={(e) => handleQuestionChange(questionIndex, e)}
                        />
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex}>
                                <label>Option: </label>
                                <input type="text"
                                    required
                                    name="optionText"
                                    value={option.optionText}
                                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                                />
                                <label>Correct: </label>
                                <input type="checkbox"
                                    name="isCorrect"
                                    checked={option.isCorrect}
                                    onChange={(e) => handleOptionChange(questionIndex, optionIndex, e)}
                                />
                            </div>
                        ))}
                        <button type="button" onClick={() => addOption(questionIndex)}>Add Option</button>
                    </div>
                ))}
                <button type="button" onClick={addQuestion}>Add Question</button>
                <div>
                    <input className="submit-btn" type="submit" value="Create Quiz" />
                </div>
            </form>
        </div>
    );
}

export default CreateQuiz;
