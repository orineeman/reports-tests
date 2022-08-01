import Question from "../../../models/question";
import connectDB from "../../../middleware/mongodb";
import Answer from "../../../models/answer";
import Student from "../../../models/student";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const questionId = req.headers.questionid;

    const question = await Question.findById(questionId).populate([
      "age",
      "subject",
      "difficulty",
      "answers",
    ]);
    const responsesTime = await Student.find({
      "tests.questions.questionId": questionId,
    }).select("tests.questions.responseTime");

    const allResponsesTimes = [];
    for (let question of responsesTime[0].tests) {
      for (let responses of question.questions) {
        allResponsesTimes.push(responses.responseTime);
      }
    }
    const averageResponsesTime =
      allResponsesTimes.reduce((a, b) => a + b, 0) / allResponsesTimes.length;
    const numberOfResponses = question.answers[0].statistics.numberOfResponses;
    const resData = {
      question,
      answers: question.answers,
      averageResponsesTime,
      numberOfResponses,
    };

    res.send(resData);
  } else if (req.method === "PATCH") {
    const dataToUpdate = JSON.parse(req.body);
    const {
      questionId,
      answerContent,
      age,
      difficulty,
      questionContent,
      subject,
    } = dataToUpdate;
    if (age) {
      await Question.findByIdAndUpdate(questionId, { age });
    }
    if (difficulty) {
      await Question.findByIdAndUpdate(questionId, { difficulty });
    }
    if (subject) {
      await Question.findByIdAndUpdate(questionId, { subject });
    }
    if (questionContent) {
      await Question.findByIdAndUpdate(questionId, {
        content: questionContent,
      });
    }
    if (answerContent) {
      const answersId = Object.keys(answerContent);
      for (let answerId of answersId) {
        await Answer.findByIdAndUpdate(answerId, {
          content: answerContent.answerId,
        });
      }
    }
    res.send(dataToUpdate);
  } else if (req.method === "DELETE") {
    const dataToDelete = JSON.parse(req.body);
    const [questionIdToDelete] = dataToDelete;
    await Question.findByIdAndRemove(questionIdToDelete);
    res.send("the question is deleted");
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
