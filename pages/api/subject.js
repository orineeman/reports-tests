import connectDB from "../../middleware/mongodb";
import Subject from "../../models/subject";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const subjects = await Subject.find();
    res.send(subjects);
  } else if (req.method === "POST") {
    const { subject } = req.body;
    if (subject) {
      try {
        const newSubject = new Subject({
          subject,
        });
        const subjectCreated = await newSubject.save();
        return res.status(200).send(subjectCreated);
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
