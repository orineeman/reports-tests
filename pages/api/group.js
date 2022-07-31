import connectDB from "../../middleware/mongodb";
import Group from "../../models/group";
import Student from "../../models/student";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const groups = await Group.find().populate("tests");
    res.send(groups);
  } else if (req.method === "POST") {
    // const group = req.body; // to postman
    const studentsId = [];
    const group = JSON.parse(req.body);
    const { students, tests, label } = group;
    if (students) {
      try {
        for (let i = 0; i < students.length; i++) {
          const { label, email } = students[i];
          const newStudent = new Student({
            label,
            email,
          });
          const newSt = await newStudent.save();
          studentsId.push(newSt._id);
        }
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("Fill in the student fields");
    }
    // ------------------------------------

    if (students && label) {
      try {
        const newGroup = new Group({
          students: studentsId,
          tests,
          label,
          haveTest: false,
        });
        const groupCreated = await newGroup.save();
        return res.status(200).send(groupCreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("Fill in the student fields and tests");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
