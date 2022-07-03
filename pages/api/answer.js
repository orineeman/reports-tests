import connectDB from "../../middleware/mongodb";
import Answer from "../../models/answer";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { content, isCorrect } = req.body;
    if (content && isCorrect !== undefined) {
      try {
        const newAnswer = new Answer({
          content,
          isCorrect,
        });
        const answerCreated = await newAnswer.save();
        return res.status(200).send(answerCreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
