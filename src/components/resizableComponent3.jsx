import React, { useEffect, useState, forwardRef, useImperativeHandle} from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const ResizableDiv = forwardRef(({getAllData}, ref) => {
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [text, setText] = useState({ _id: null, text: "" });

  const handleTextChange = (event) => {
    setText({ ...text, text: event.target.value });
  };

  useImperativeHandle(ref, () => ({
    setText,
  }), []);

  // Add your logic for handling the submit action
  const handleSubmit = async () => {
    try {
      console.log({text})
      if (text._id) {
        let url = process.env.REACT_APP_BASE_URL + `/todo/updateTodo`;
        let data = text;
        await axios.patch(url, data);
      } else {
        let url = process.env.REACT_APP_BASE_URL + `/todo/addTodo`;
        let data = text;
        await axios.post(url, data);
      }
      getAllData()
      setText({ _id: null, text: "" });
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    getSize();
    window.addEventListener("resize", getSize);
  }, []);

  const getSize = () => {
    let obj = {
      height: window.innerHeight / 2 - 10,
      width: window.innerWidth - 10,
    };
    setSize(obj);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <ResizableBox
      width={size.width}
      height={size.height}
      resizeHandles={["ne", "nw", "se", "sw", "n", "e", "s", "w"]}
      minConstraints={[100, 50]}
    >
      <div
        style={{
          position: "relative",
          border: "1px solid #ddd",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label={text._id ?"update todo" :"add new todo"}
          variant="outlined"
          width={size.width}
          fullWidth
          style={{ width: "70%" }}
          rows={3}
          value={text.text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  endIcon={<SendIcon />}
                >
                  {text._id ? "Update" : "add"}
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </ResizableBox>
  );
});

export default ResizableDiv;
