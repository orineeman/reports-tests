import connectDB from "../../middleware/mongodb";
import Difficulty from "../../models/difficulty";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const difficulties = await Difficulty.find().populate("difficulty");
    res.send(difficulties);
  } else if (req.method === "POST") {
    const { difficulty } = req.body;
    if (difficulty) {
      try {
        const newDifficulty = new Difficulty({
          difficulty,
        });
        const difficultyCreated = await newDifficulty.save();
        return res.status(200).send(difficultyCreated);
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
