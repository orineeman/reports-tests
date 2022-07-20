import Question from "../../../models/question";
import connectDB from "../../../middleware/mongodb";
import Answer from "../../../models/answer";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const questionId = req.headers.questionid;

    const question = await Question.findById(questionId).populate([
      "age",
      "subject",
      "difficulty",
    ]);
    const answers = [];
    for (let answer of question.answers) {
      const ans = await Answer.findById(answer._id);
      answers.push(ans);
    }
    const resData = { question, answers };

    res.send(resData);
  } else if (req.method === "PATCH") {
    const dataToUpdate = JSON.parse(req.body);
    console.log("dataToUpdate", dataToUpdate);
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
    // if (answerContent) {
    //   console.log("answerContent", answerContent);
    //   const answersId = Object.keys(answerContent);
    //   console.log("answersId", answersId);

    //   for (let answerId of answersId) {
    //     await Question.findByIdAndUpdate(answerId, {
    //       content: answerContent.answerId,
    //     });
    //   }
    // }
    res.send(dataToUpdate);
  } else if (req.method === "DELETE") {
    const dataToDelete = JSON.parse(req.body);
    const [questionIdToDelete] = dataToDelete;
    console.log("questionIdToDelete", questionIdToDelete);
    await Question.findByIdAndRemove(questionIdToDelete);
    res.send("the question is deleted");
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
