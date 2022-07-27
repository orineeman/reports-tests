import connectDB from "../../middleware/mongodb";
import Message from "../../models/message";
import Teacher from "../../models/teacher";
import getDate from "../../utils/getDate";
import sendEmail from "../../utils/mail";

const handler = async (req, res) => {
  if (req.method === "GET") {
    if (req.headers.pleaseget === "numOfNewMessages") {
      const numOfNewMessages = await Message.countDocuments({ isRead: false });
      res.send(numOfNewMessages);
    } else if (req.headers.pleaseget === "messageid") {
      const messageId = req.headers.messageid;
      console.log(messageId);
      const message = await Message.findById(messageId);
      res.send(message);
    } else {
      const messages = await Message.find();
      res.send(messages);
    }
  } else if (req.method === "POST") {
    const { message } = JSON.parse(req.body);
    if (message.message && message.email) {
      try {
        const newMessage = new Message({
          message: message.message,
          email: message.email,
          isRead: false,
          date: getDate(),
        });
        await newMessage.save();
        return res.status(200).send(message);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("data_incomplete");
    }
  } else if (req.method === "PATCH") {
    const message = JSON.parse(req.body);
    const answer = message.answer;
    const [messageId] = message.messageId;
    const email = message.teacherMessage.email;
    if (answer) {
      await Message.findByIdAndUpdate(messageId, {
        isRead: true,
        answer,
      });
      const teacher = await Teacher.findOne({ email });
      // console.log("teacherName", teacherName);
      await sendEmail(
        `Hi ${teacher.name}, `,
        `Thank you for your inquiry, we have carefully read your words and this is our answer: ${answer}`,
        email
      );
    } else {
      await Message.findByIdAndUpdate(messageId, {
        isRead: true,
      });
    }
    res.send({ status: "success" });
  } else if (req.method === "DELETE") {
    const [messageId] = JSON.parse(req.body);
    await Message.findByIdAndRemove(messageId);
    res.send({ status: "success" });
  } else {
    res.status(422).send("req_method_not_supported");
  }
};

export default connectDB(handler);
