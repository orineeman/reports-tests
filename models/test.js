import mongoose from "mongoose";
import Question from "./question";
const Schema = mongoose.Schema;

const test = new Schema({
  questions: [{ type: Schema.Types.ObjectId, ref: Question }],
});

mongoose.models = {};

const Test = mongoose.model("test", test);

export default Test;
