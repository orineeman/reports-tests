import connectDB from "../../../middleware/mongodb";
import Group from "../../../models/group";
import Student from "../../../models/student";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const email = req.query.email[0];
    const groupId = req.query.email[1];
    const testId = req.query.email[2];
    console.log("email", email);
    console.log("groupId", groupId);
    console.log("testId", testId);
    const group = await Group.findById(groupId);
    console.log();
    const students = [];
    for (let studentId of group.students) {
      const student = await Student.findById(studentId);
      students.push(student);
    }
    res.send(students);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
