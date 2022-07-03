import mongoose from "mongoose";
const Schema = mongoose.Schema;

const answer = new Schema({
  content: String,
  isCorrect: Boolean,
});

mongoose.models = {};

const Answer = mongoose.model("answer", answer);

export default Answer;
