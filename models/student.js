import mongoose from "mongoose";
import Answer from "./answer";
import Question from "./question";
import Test from "./test";
const Schema = mongoose.Schema;

const student = new Schema({
  fullName: String,
  email: String,
  tests: [
    {
      test: { type: Schema.Types.ObjectId, ref: Test },
      currentQuestion: Number,
      report: {
        questions: [
          {
            questionId: { type: Schema.Types.ObjectId, ref: Question },
            responseTime: Number,
            answers: [
              {
                answer: { type: Schema.Types.ObjectId, ref: Answer },
                markAsCorrectAnswer: Boolean,
                answerCorrectly: Boolean,
              },
            ],
          },
        ],
        grade: Number,
      },
    },
  ],
});

mongoose.models = {};

const Student = mongoose.model("student", student);

export default Student;
