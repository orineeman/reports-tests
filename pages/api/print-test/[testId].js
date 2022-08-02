import connectDB from "../../../middleware/mongodb";
import Test from "../../../models/test";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { testId } = req.query;
    console.log(testId);

    const test = await Test.findById(testId)
      .populate("questions")
      .populate({
        path: "questions",
        select: "content",
        populate: { path: "answers", select: "content" },
      });

    res.send(test);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
