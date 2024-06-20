const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema =new Schema({
    questionText: {
        type:String,
        required:true
    },
    options:[{
        optionText:{
            type:String,
            required:true
        },
        isCorrect:{type:Boolean,required:true}
    }]
});

const quizSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    questions:[questionSchema]
},{
    timestamps:true,
});

const Quiz = mongoose.model('Quiz',quizSchema);

module.exports = Quiz;