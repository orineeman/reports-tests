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
    console.log("data:", data);
    // const teacher = req.body; //postman
    const { markedAnswer, time, currentQuestion, email, testId, questionId } =
      data.dataToServer;
    if (markedAnswer && currentQuestion && email && testId && questionId) {
      //  עדכון התלמיד בשאלה הספציפית שעומד
      const updateTestOfStudent = await Student.findOneAndUpdate(
        { email, "tests.test": testId },
        {
          "tests.report.questions.questionId": questionId,
          "tests.report.currentQuestion": questionId,
          "tests.report.questions.responseTime": time,
          "tests.report.questions.answers.answer": markedAnswer,
        }
      );
      res.send("updateTestOfStudent");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
