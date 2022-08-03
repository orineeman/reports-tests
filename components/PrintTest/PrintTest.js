import { Button, Checkbox, Divider } from "@mui/material";
import { forwardRef, useRef } from "react";
import ReactToPrint from "react-to-print";
import styles from "./PrintTest.module.css";

const TestToPrintComponent = ({ testToPrint }, ref) => {
  return (
    <div ref={ref}>
      <div style={{ padding: "40px" }}>
        <div
          style={{
            fontSize: "30px",
            display: "flex",
            justifyContent: "center",
            textDecoration: "underline",
            marginBottom: "30px",
          }}
        >
          {testToPrint?.label}
        </div>
        <div>
          {testToPrint?.questions?.map((question, index) => (
            <div key={question._id}>
              <div
                style={{
                  fontSize: "24px",
                  marginBottom: "20px",
                }}
              >
                Question: {index + 1}
              </div>
              <div
                style={{
                  fontSize: "21px",
                  marginLeft: "15px",
                  marginBottom: "15px",
                }}
              >
                {question?.content} = ?
              </div>
              {question?.answers?.map((answer) => (
                <div
                  key={answer._id}
                  style={{
                    fontSize: "18px",
                    marginLeft: "20px",
                  }}
                >
                  <Checkbox />
                  {answer.content}
                </div>
              ))}

              <Divider
                style={{
                  width: "200px",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            fontSize: "30px",
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          Goodluck!
        </div>
      </div>
    </div>
  );
};

const TestToPrint = forwardRef(TestToPrintComponent);

export default function PrintTest({ testToPrint, displayPrint }) {
  let componentRef = useRef();
  return (
    <>
      <div>
        <div style={{ display: displayPrint }}>
          <ReactToPrint
            trigger={() => (
              <Button
                className={styles.printButton}
                variant="contained"
                sx={{
                  background: "rgba(133, 64, 245, 0.97)",
                }}
                key="print"
              >
                Print
              </Button>
            )}
            content={() => componentRef}
          />
        </div>

        <div style={{ display: "none" }}>
          <TestToPrint
            ref={(el) => (componentRef = el)}
            testToPrint={testToPrint}
          />
        </div>
      </div>
    </>
  );
}
