import mongoose from "mongoose";
// import Question from "./question";
// import Student from "./student";
import Test from "./test";
import Group from "./group";
const Schema = mongoose.Schema;
// import Map from "mongoose";

const teacher = new Schema({
  name: String,
  email: String,
  image: String,
  groups: [{ type: Schema.Types.ObjectId, ref: Group }],
  tests: [{ type: Schema.Types.ObjectId, ref: Test }],
  sendTests: [
    {
      date: String,
      test: { type: Schema.Types.ObjectId, ref: Test },
      groupId: { type: Schema.Types.ObjectId, ref: Group },
      report: [
        // {
        // question: { type: Schema.Types.ObjectId, ref: Question },
        // studentsRight: [{ type: Schema.Types.ObjectId, ref: Student }],
        // },
      ],
    },
  ],
});

mongoose.models = {};

const Teacher = mongoose.model("teacher", teacher);

export default Teacher;
