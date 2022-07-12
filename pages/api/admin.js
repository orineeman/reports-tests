import connectDB from "../../middleware/mongodb";
import Permission from "../../models/permissions";
import sendEmail from "../../utils/mail";

const handler = async (req, res) => {
  if (req.method === "GET") {
    if (
      req.headers.pleaseget === "permissionAdmin" &&
      req.headers.email === process.env.EMAIL
    ) {
      const status = { status: "confirm" };
      res.send(status);
    } else {
      const status = { status: "not confirm" };
      res.send(status);
    }
  } else if (req.method === "POST") {
    const permissions = JSON.parse(req.body);
    if (permissions[0]) {
      const alreadyHavePermissions = [];
      let havePermissions = false;
      try {
        for (let i = 0; i < permissions.length; i++) {
          const { fullName, email } = permissions[i];
          console.log("fullName", fullName, "email", email);
          const validationOfPermissions = await Permission.findOne({
            email,
          });
          console.log("validationOfPermissions:", validationOfPermissions);
          if (!validationOfPermissions) {
            const newStudent = new Permission({
              fullName,
              email,
            });
            await newStudent.save();
            await sendEmail(
              `Hi ${fullName}, `,
              "In good time you received permission to the site, to start working a conference here: http://localhost:3000/teachers",
              email
            );
          } else {
            alreadyHavePermissions.push(email);
            havePermissions = true;
          }
        }
        if (havePermissions) {
          res.send(alreadyHavePermissions);
        } else {
          const message = { status: "success" };
          res.status(200).send(message);
        }
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("Fill in the fields");
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
