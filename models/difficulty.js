import mongoose from "mongoose";
const Schema = mongoose.Schema;

const difficulty = new Schema({
  difficulty: String,
});

mongoose.models = {};

const Difficulty = mongoose.model("difficulty", difficulty);

export default Difficulty;
