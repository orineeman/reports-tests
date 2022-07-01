import mongoose from "mongoose";
const Schema = mongoose.Schema;

const question = new Schema({
  // typeQuestion: String,
  age: Number,
  subject: String,
  difficulty: Number,
  statistics: {
    numberOfRespondents: Number,
    amountOfRight: Number,
    amountOfMistakes: Number,
    averageResponseTimeSec: Number,
  },
  question: String,
  answer1: { answer: Number, isCorrect: Boolean },
  answer2: { answer: Number, isCorrect: Boolean },
  answer3: { answer: Number, isCorrect: Boolean },
  answer4: { answer: Number, isCorrect: Boolean },
});

mongoose.models = {};

const Question = mongoose.model("question", question);

export default Question;
