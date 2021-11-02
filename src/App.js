import React, { useState,useEffect, useRef } from 'react';
import Login from './login';
import Main_parent from './main_parent';
import Main_babysitter from './main_babysitter';
import Profile_babysitter from './profile_babysitter';
import Register from './registerform';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { onMessageListener } from "./firebase";
import Notifications from "./components/Notifications/Notification";
import ReactNotificationComponent from "./components/Notifications/ReactNotification";
import dotenv from 'dotenv';


function App() {

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [token, setToken] = useState(null);
  const [loadNotifications, setLoadNotification]=useState(false);

  console.log(show, notification);
  useEffect(()=>{
    console.log("this is from App"+token);
  },[token])

  useEffect(()=>{console.log("Notification received"+loadNotifications)},[loadNotifications])

  onMessageListener()
    .then((payload) => {
      setLoadNotification(true);
      setShow(true);
      setNotification({
        title: payload.data.title,
        body: payload.data.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));
 
  return (
    <div>
    <Router>
     
       
      <Switch>
        <Route exact path="/">
          <Login token={token}/>
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/main/parent">
          <Main_parent token={token} loadNotifications={loadNotifications} setLoadNotification={setLoadNotification} />
        </Route>
        <Route exact path="/main/babysitter">
          <Main_babysitter token={token} loadNotifications={loadNotifications} setLoadNotification={setLoadNotification} />
        </Route>
        <Route exact path="/babysitter/profile">
          <Profile_babysitter />
        </Route>


      </Switch>
     
      </Router>

      {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      <Notifications setToken={setToken} />
      </div>
      
  );
}

export default App;