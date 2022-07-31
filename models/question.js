import mongoose from "mongoose";
import Age from "./age";
import Answer from "./answer";
import Difficulty from "./difficulty";
import Subject from "./subject";
const Schema = mongoose.Schema;

const question = new Schema({
  age: { type: Schema.Types.ObjectId, ref: Age },
  subject: { type: Schema.Types.ObjectId, ref: Subject },
  difficulty: { type: Schema.Types.ObjectId, ref: Difficulty },
  content: String,
  answers: [{ type: Schema.Types.ObjectId, ref: Answer }],
  // answers: [{ content: String, isCorrect: Boolean }],
  confirmed: Boolean,
});

mongoose.models = {};

const Question = mongoose.model("question", question);

export default Question;
