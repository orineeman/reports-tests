import mongoose from "mongoose";
import Question from "./question";
const Schema = mongoose.Schema;

const test = new Schema({
  question: [{ type: Schema.Types.ObjectId, ref: Question }],
});

mongoose.models = {};

const Test = mongoose.model("Teacher", test);

export default Test;
