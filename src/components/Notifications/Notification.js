import React, { useState, useEffect } from "react";
import { getToken } from "../../firebase.js";

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);

  console.log("Token found", isTokenFound);

  // To load once
  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getToken(setTokenFound);
      if (data) {
        console.log("Token is", data);
        props.setToken(data)
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  return <></>;
};

Notifications.propTypes = {};

export default Notifications;