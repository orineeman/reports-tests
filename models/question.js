import mongoose from "mongoose";
// import Age from "./age";
import Answer from "./answer";
import Difficulty from "./difficulty";
import Subject from "./subject";
const Schema = mongoose.Schema;

const question = new Schema({
  // age: { type: Schema.Types.ObjectId, ref: Age },
  age: String,
  subject: { type: Schema.Types.ObjectId, ref: Subject },
  difficulty: { type: Schema.Types.ObjectId, ref: Difficulty },
  statistics: {
    numberOfResponses: Number,
    amountOfRight: Number,
    amountOfMistakes: Number,
    averageResponseTimeSec: Number,
  },
  content: String,
  answers: [{ type: Schema.Types.ObjectId, ref: Answer }],
  confirmed: Boolean,
});

mongoose.models = {};

const Question = mongoose.model("question", question);

export default Question;
