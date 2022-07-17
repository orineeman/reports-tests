import Student from "../../../models/student";
import connectDB from "../../../middleware/mongodb";
import Permission from "../../../models/permissions";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { email } = req.query;
    let permissions = {};
    console.log("email", email);
    if (email === process.env.EMAIL) {
      permissions.adminPermission = true;
    }
    const teacherPermission = await Permission.findOne({
      email,
    });
    const studentPermission = await Student.findOne({
      email,
    });
    if (teacherPermission) {
      permissions.teacherPermission = true;
    }
    if (studentPermission) {
      permissions.studentPermission = true;
    }
    res.send(permissions);
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
