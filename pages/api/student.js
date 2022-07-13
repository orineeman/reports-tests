import connectDB from "../../middleware/mongodb";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "GET") {
    if (req.headers.pleaseget === "tests") {
      const studentTests = await Student.findOne({
        email: req.headers.email,
      }).populate(["tests.test"]);
      console.log("studentTests", studentTests);
      res.send(studentTests);
    }
  } else if (req.method === "PATCH" && req.headers.answer === "answer") {
    const data = JSON.parse(req.body);
    // const teacher = req.body; //postman
    const {
      markedAnswerId,
      time,
      currentQuestion,
      email,
      testId,
      questionId,
      restAnswers,
    } = data.dataToServer;

    // console.log("data.dataToServer", data.dataToServer);
    if (
      markedAnswerId &&
      currentQuestion &&
      email &&
      testId &&
      questionId &&
      restAnswers
    ) {
      //  עדכון התלמיד בשאלה הספציפית שעומד
      // const p = await Student.findOne({ email })
      // .where("tests.test")
      // .equals(testId);
      // console.log("p############3:", p);
      // for (let test of p.tests) {
      // test.currentQuestion = currentQuestion;
      // test.done = false;
      const p = await Student.findOneAndUpdate(
        { email, "tests.test": testId },
        {
          $set: {
            "tests.$.done": true,
            "tests.$.currentQuestion": currentQuestion,
            "tests.report.questions": 70,
            $push: { "tests.report.questions": { test: testId } },
          },
        }
      );
    }

    // currentQuestion,
    // const reportQuestion = {
    //   questionId,
    //   responseTime: time,
    //   answers: [
    //     {
    //       answer: { type: Schema.Types.ObjectId, ref: Answer },
    //       markAsCorrectAnswer: Boolean,
    //       answerCorrectly: Boolean,
    //     },
    //   ],
    // };

    // const updateTestOfStudent = await Student.findOneAndUpdate(
    // { email, "tests.test": testId },
    // {
    // "tests.report.questions": reportQuestion,
    // "tests.report.questions.questionId": questionId,
    // "tests.report.currentQuestion": questionId,
    // "tests.report.questions.responseTime": time,
    // "tests.report.questions.answers.answer": markedAnswer,
    // }
    // );
    res.send("updateTestOfStudent");
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
