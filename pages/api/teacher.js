import connectDB from "../../middleware/mongodb";
import Teacher from "../../models/teacher";
import sendEmail from "../../utils/mail";

const handler = async (req, res) => {
  if (req.method === "GET") {
    if (req.headers.pleaseget === "groups and tests") {
      const teacherDetails = await Teacher.findOne({
        email: req.headers.email,
      }).populate(["groups", "tests"]);
      res.send(teacherDetails);
    }
  } else if (req.body.pleaseGet === "get all teachers to admin") {
    const teacher = await Teacher.findById().populate([]);
    res.send(teacher);
  } else if (req.method === "PATCH") {
    const teacher = JSON.parse(req.body);
    if (teacher.testId) {
      const { email, testId } = teacher;
      const updateTestsTeacher = await Teacher.findOneAndUpdate(
        { email },
        { $push: { tests: testId } }
      );
      res.send(updateTestsTeacher);
    }

    if (teacher.groupId) {
      const { teacherName, email, groupId } = teacher;
      const updateGroupsTeacher = await Teacher.findOneAndUpdate(
        { email },
        { $push: { groups: groupId } }
      );
      res.send(updateGroupsTeacher);
      sendEmail(`hi ${teacherName}`, "your group saved", email);
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
