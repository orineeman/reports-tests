import connectDB from "../../../middleware/mongodb";
import Answer from "../../../models/answer";
import Question from "../../../models/question";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const allQuestions = await Question.find({}, "content");
    let newArr = [];
    for (let question of allQuestions) {
      const q = await Question.findOne({ _id: question._id });
      for (let answer of q.answers) {
        if (answer.isCorrect) {
          const { statistics } = await Answer.findById(
            answer._id,
            "statistics"
          );
          let newObj = {};
          newObj.content = question.content;
          newObj.questionId = question._id;
          newObj.statistics = statistics;
          newArr.push(newObj);
        }
      }
    }
    res.send(newArr);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
