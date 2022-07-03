import mongoose from "mongoose";
import Question from "./question";
import Student from "./student";
import Test from "./test";
import Group from "./group";
const Schema = mongoose.Schema;

const teacher = new Schema({
  email: {
    type: String,
  },
  classes: [{ type: Schema.Types.ObjectId, ref: Group }],
  tests: [
    {
      test: { type: Schema.Types.ObjectId, ref: Test },
      students: [{ type: Schema.Types.ObjectId, ref: Student }],
      classId: { type: Schema.Types.ObjectId, ref: Group },
      report: [
        {
          question: { type: Schema.Types.ObjectId, ref: Question },
          studentsRight: [{ type: Schema.Types.ObjectId, ref: Student }],
        },
      ],
    },
  ],
});

mongoose.models = {};

const Teacher = mongoose.model("Teacher", teacher);

export default Teacher;
