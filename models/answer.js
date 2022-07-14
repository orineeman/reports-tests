import mongoose from "mongoose";
const Schema = mongoose.Schema;

const answer = new Schema({
  content: String,
  isCorrect: Boolean,
  statistics: {
    numberOfResponses: { type: Number, default: 0 },
    amountOfRight: { type: Number, default: 0 },
    amountOfMistakes: { type: Number, default: 0 },
  },
});

mongoose.models = {};

const Answer = mongoose.model("answer", answer);

export default Answer;
