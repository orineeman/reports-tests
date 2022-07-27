import connectDB from "../../../middleware/mongodb";
import Permission from "../../../models/permissions";
import Teacher from "../../../models/teacher";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { email } = req.query;
    let teacherDetails = {};
    const validationOfPermissions = await Permission.findOne({
      email,
    });
    if (validationOfPermissions) {
      teacherDetails = await Teacher.findOne({
        email,
      })
        .populate(["groups", "tests"])
        .populate("sendTests.groupId")
        .populate({ path: "groups", populate: { path: "students" } })
        .populate({ path: "tests", populate: { path: "questions" } });
    }

    res.send(teacherDetails);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
