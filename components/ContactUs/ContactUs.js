import { Button, TextareaAutosize } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useContext, useState } from "react";
import messageContext from "../../Context/messageContext";
import styles from "./ContactUs.module.css";

async function sendMessageToServer(
  message,
  setOpenDrawer,
  setMessage,
  setShowMessage
) {
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

function close(setOpenDrawer) {
  setOpenDrawer(false);
}

const message = { email: "", message: "" };

export default function ContactUs({ email, openDrawer, setOpenDrawer }) {
  const { setMessage, setShowMessage } = useContext(messageContext);
  const [disabled, setDisabled] = useState(true);

  const anchor = "left";
  message.email = email;

  function handleChangeMessage() {
    message.message = event.target.value;
    if (message.message) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Drawer
        anchor={anchor}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div style={{ width: 200, marginTop: 50, marginLeft: 30 }}>
          <div className={styles.drowerTitle}>Dear teacher,</div>

          <div className={styles.drowerText}>
            <br /> your comments are important to us. <br />
            For comments, suggestions, send to us and we will respond as soon as
            possible.
          </div>
        </div>
        <TextareaAutosize
          autoFocus
          minRows={3}
          placeholder="Write Here"
          style={{
            padding: "8px",
            maxWidth: 200,
            minWidth: 200,
            minHeight: 80,
            maxHeight: 80,
            marginLeft: 30,
            marginRight: 30,
            fontSize: 17,
          }}
          onChange={handleChangeMessage}
        />
        <div
          className={styles.drowerTitle}
          style={{
            width: 200,
            marginTop: 50,
            marginLeft: 30,
            marginBottom: 50,
          }}
        >
          We appreciate it
        </div>
        <Button
          disabled={disabled}
          sx={{
            background: "rgba(133, 64, 245, 0.97)",
            color: "#ffffff",
            marginBottom: "5vh",
          }}
          className={styles.sendButton}
          variant="outlined"
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
        <Button
          className={styles.closeBtn}
          sx={{ color: "#140b53" }}
          onClick={() => close(setOpenDrawer)}
        >
          close
        </Button>
      </Drawer>
    </div>
  );
}
