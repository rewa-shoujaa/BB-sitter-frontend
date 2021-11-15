import React, { useState, useEffect, useRef } from "react";
import * as firebase from "firebase/app";
// Import the functions you need from the SDKs you need
import * as firestore from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Paper, makeStyles } from "@material-ui/core";
import ScrollToBottom from "react-scroll-to-bottom";
import "./chatting.css";
import Moment from "moment";
import Box from "@mui/material/Box";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZTkj_qmfvP6bwQSDG6TyUPkcmdLXCLfc",
  authDomain: "bb-sitter-app.firebaseapp.com",
  projectId: "bb-sitter-app",
  storageBucket: "bb-sitter-app.appspot.com",
  messagingSenderId: "1052906398986",
  appId: "1:1052906398986:web:8cb042fd7f0de4a4ea46f3",
  measurementId: "G-PW6B8N7RBL",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      margin: theme.spacing(1),
    },
    "& .MuiGrid-root": {
      width: "100%",
      padding: "0",
    },
  },
}));

const db = firebase.firestore();

const Chatting = (props) => {
  const [messages, setmessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");

  const messageEl = useRef();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (db) {
      db.collection("messages").add({
        text: newMessage,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        from: props.user[0].firstname + " " + props.user[0].lastname,
        user_id: props.user[0].userid,
      });
      setnewMessage("");
      scrolltoBottom();
    }
  };

  useEffect(() => {
    if (db) {
      db.collection("messages")
        .orderBy("time")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setmessages(data);
        });
    }
    scrolltoBottom();
    console.log("scroll");
  }, [db]);

  const scrolltoBottom = () => {
    messageEl.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrolltoBottom();
    console.log("scroll");
  });

  const classes = useStyles();
  return (
    <Paper>
      <div className="chat-window">
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messages.map((message) => (
              <div
                className="message"
                id={props.user[0].userid === message.user_id ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{message.text}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">
                      {Moment(message.time).format("DD-MM-YYYY HH:mm")}
                    </p>
                    <p id="author">{message.from}</p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollToBottom>
        </div>
        <div className="chat-footer" style={{ width: "100%" }}>
          <form
            validate
            onSubmit={handleOnSubmit}
            style={{ width: "100%" }}
            className={classes.root}
          >
            <Grid container spacing={0}>
              <Grid item xs={10}>
                <TextField
                  variant="outlined"
                  label="Message"
                  name="Message"
                  autoComplete="off"
                  required
                  multiline
                  style={{ height: "100%", margin: "0px" }}
                  rows={2}
                  value={newMessage}
                  onChange={(e) => {
                    setnewMessage(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#2E3B55",
                    color: "#FFFFFF",
                    height: "100%",
                    width: "100%",
                    margin: "0px",
                    marginLeft: "2px",
                  }}
                  variant="contained"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleOnSubmit();
                    }
                  }}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <div style={{ float: "left", clear: "both" }} ref={messageEl}></div>
    </Paper>
  );
};

export default Chatting;
