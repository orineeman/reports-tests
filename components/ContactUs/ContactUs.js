import { Button, TextareaAutosize } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useContext } from "react";
import messageContext from "../../Context/messageContext";

async function sendMessageToServer(
  message,
  setOpenDrawer,
  setMessage,
  setShowMessage
) {
  console.log(message);
  try {
    await fetch("/api/contact-us", {
      method: "POST",
      body: JSON.stringify({
        message,
      }),
    });
  } catch (e) {
    console.log("error");
  }
  setShowMessage(true);
  setMessage("Your message has been saved, thank you!");
  setOpenDrawer(false);
}

const message = { email: "", message: "" };
export default function ContactUs({ email, openDrawer, setOpenDrawer }) {
  const { setMessage, setShowMessage } = useContext(messageContext);

  const anchor = "left";
  message.email = email;
  function handleChangeMessage() {
    message.message = event.target.value;
    console.log(message);
  }

  return (
    <div>
      <Drawer
        anchor={anchor}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div style={{ width: 200, marginTop: 50, marginLeft: 30 }}>
          <h3>
            Dear teacher, <br />
            <br /> your comments are important to us <br />
            For comments, suggestions, send to us and we will respond as soon as
            possible
          </h3>
        </div>
        <TextareaAutosize
          aria-label="minimum height"
          autoFocus
          minRows={3}
          placeholder="Write here"
          style={{ width: 200, marginLeft: 30, marginRight: 30, fontSize: 17 }}
          onChange={handleChangeMessage}
        />
        <h4 style={{ width: 200, marginTop: 50, marginLeft: 30 }}>
          We appreciate it
        </h4>
        <Button
          variant="outlined"
          sx={{ margin: "50px", width: "150px" }}
          key="send message"
          type="send message"
          onClick={() =>
            sendMessageToServer(
              message,
              setOpenDrawer,
              setMessage,
              setShowMessage
            )
          }
        >
          Send message
        </Button>
      </Drawer>
    </div>
  );
}
