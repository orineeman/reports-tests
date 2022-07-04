import connectDB from "../../middleware/mongodb";
import Age from "../../models/age";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const ages = await Age.find().populate("age");
    res.send(ages);
  } else if (req.method === "POST") {
    const { age } = req.body;
    if (age) {
      try {
        const newAge = new Age({
          age,
        });
        const ageCreated = await newAge.save();
        return res.status(200).send(ageCreated);
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
