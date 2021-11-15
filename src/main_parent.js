import React, { useState, useEffect, useRef } from "react";
import { CssBaseline, Grid, Typography } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import Card from "@mui/material/Card";
import Popup from "./components/Popup";
import Appointment from "./appointment_form";
import FeelinglingLucky from "./feelingLucky";
import ParentProfile from "./myProfile_parent";
import BabysitterProfile from "./profile_babysitter";
import axios from "axios";
import { useHistory } from "react-router-dom";
import localStorage from "local-storage";
import ListMUI from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Appointments_list from "./appointments_parent";
import Rate from "./Rating_form";
import { margin } from "@mui/system";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import Chatting from "./chatting";
import ViewRating from "./ViewRating";

function Main_parent(props) {
  console.log(props);

  let history = useHistory();
  const [openBabysitterProfile, setopenBabysitterProfile] = useState(false);
  const [openbookApp, setopenbookApp] = useState(false);
  const [openfeelinglucky, setopenfeelinglucky] = useState(false);
  const [openMyProfile, setopenMyProfile] = useState(false);

  const [userProfile, setuserProfile] = useState([]);
  const [babysitterslist, setbabysitterslist] = useState([]);
  const [userCity_ID, setuserCity_ID] = useState("");
  const [userlongitude, setuserlongitude] = useState(35.49548);
  const [userLatitude, setuserLatitude] = useState(33.88863);
  const [listloaded, setlistLoaded] = useState(false);
  const [chosenBabysitter, setchosenBabysitter] = useState("");
  const [babysitterInfo, setbabysitterInfo] = useState([]);
  const [babysitterinfoloaded, setbabysitterinfoloaded] = useState(false);
  const [babysitterListMap, setbabysitterListMap] = useState([]);
  const [babysitterformapLoaded, setbabysitterformapLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [SearchLoading, setSearchLoading] = useState(false);
  const [loadingInfo, setloadingInfo] = useState(false);
  const [openProfile, setopenProfile] = useState(false);
  const [openAppointments, setopenAppointments] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [loadNotifcations, setloadNotifcations] = useState(false);
  const [notificationList, setNotificationList] = useState([]);
  const [notificationCount, setnotificationCount] = useState(0);
  const [openViewRating, setopenViewRating] = useState(false);

  ////Appointments List for parent
  const [status, setstatus] = useState(0);
  const [AppointmentList, setAppointmentLast] = useState([]);
  const [AppListLoaded, setAppListLoaded] = useState(false);
  const [openAppointmentsList, setopenAppointmentsList] = useState(false);

  //////Rating
  const [openRate, setopenRate] = useState(false);

  axios.defaults.baseURL = "";
  /////get token from local storage
  const getAuthState = async () => {
    try {
      const authDataString = await localStorage.get("auth");
      const authData = JSON.parse(authDataString || {});
      console.log(authData);
      axios.defaults.headers["Authorization"] = "bearer" + authData.token;
      GetUserProfile();
      getbabysitterstoMap();
      getNotification();
      // Set_Token();
    } catch (err) {
      history.push("/");
    }
  };

  const useDidMountEffect = (func, deps) => {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) {
        func();
      } else {
        didMount.current = true;
      }
    }, deps);
  };

  useEffect(() => {
    getAuthState();
    console.log("Auth");
  }, []);

  useEffect(() => {
    console.log(userProfile);
    console.log("userProfile");
  }, [userProfile]);

  useDidMountEffect(() => {
    getbabysitters();
    console.log(userCity_ID);
  }, [userCity_ID]);

  useDidMountEffect(() => {
    console.log(babysitterInfo);
    setbabysitterinfoloaded(true);
  }, [babysitterInfo]);

  useDidMountEffect(() => {
    console.log(chosenBabysitter);
    GetBabysitterInfo();
  }, [chosenBabysitter]);

  useDidMountEffect(() => {
    console.log(props.loadNotifications);
    getNotification();
    props.setLoadNotification(false);
  }, [props.loadNotifications]);

  function getNotification() {
    let array = [];
    setNotificationList([]);
    setloadNotifcations(false);
    axios
      .get(process.env.REACT_APP_API_URL + "/getNotifications")
      .then((response) => {
        console.log("notificationss", response);
        for (let i = 0; i < response.data.length; i++) {
          array.push({
            notification: response.data[i].text,
          });
        }
        setNotificationList(array);
        setloadNotifcations(true);
        setnotificationCount(array.length);
      });
  }

  function NotificationRead() {
    let array = [];
    setNotificationList([]);
    //setloadNotifcations(false);
    //axios.get(`http://127.0.0.1:8000/api/setRead`)
    axios.get(process.env.REACT_APP_API_URL + "/setRead").then((response) => {
      console.log(response);
      setNotificationList([]);
      setnotificationCount(0);
    });
  }

  function GetUserProfile() {
    //axios.get("http://127.0.0.1:8000/api/getParentDetails")
    axios
      .get(process.env.REACT_APP_API_URL + "/getParentDetails")
      .then((response) => {
        let usersarray = [];
        setuserProfile([]);
        usersarray.push({
          userid: response.data[0].id,
          firstname: response.data[0].first_name,
          lastname: response.data[0].last_name,
          address_id: response.data[2].id,
          img: response.data[1].picture,
          parent_id: response.data[1].id,
          user_lat: response.data[2].address_latitude,
          user_long: response.data[2].address_longitude,
          user_city: response.data[2].city_id,
          user_country: response.data[2].country,
          picture: response.data[1].picture,
          phone: response.data[1].phone_number,
          gender: response.data[1].gender,
          dob: response.data[1].date_of_birth,
        });
        setuserCity_ID(response.data[2].city_id);
        setuserProfile(usersarray);
        setuserlongitude(response.data[2].address_longitude);
        setuserLatitude(response.data[2].address_latitude);
        //console.log(userProfile);
      });
  }

  function getbabysitters() {
    let usersarray = [];
    setbabysitterslist([]);
    axios
      .get(
        process.env.REACT_APP_API_URL + "/getBabysittersinCity/" + userCity_ID
      )
      .then((response) => {
        //console.log(response);
        console.log(response.data[0]);
        for (let i = 0; i < response.data.length; i++) {
          usersarray.push({
            id: response.data[i].user_id,
            firstname: response.data[i].first_name,
            lastname: response.data[i].last_name,
            phone: response.data[i].phone_number,
            addressID: response.data[i].address_id,
            lat: response.data[i].address_latitude,
            long: response.data[i].address_longitude,
            dob: response.data[i].date_of_birth,
            gender: response.data[i].gender,
            picture: response.data[i].picture,
            aboutme: response.data[i].about_me,
            rate: response.data[i].rate,
          });
        }
        setbabysitterslist(usersarray);
        setlistLoaded(true);
      });
  }

  function SearchResult() {
    setSearchLoading(true);
    let usersarray = [];
    setbabysitterslist([]);
    axios
      .post(process.env.REACT_APP_API_URL + "/search", {
        city: userCity_ID,
        name: search,
      })
      .then((response) => {
        console.log(response);
        for (let i = 0; i < response.data.length; i++) {
          usersarray.push({
            id: response.data[i].user_id,
            firstname: response.data[i].first_name,
            lastname: response.data[i].last_name,
            phone: response.data[i].phone_number,
            addressID: response.data[i].address_id,
            lat: response.data[i].address_latitude,
            long: response.data[i].address_longitude,
            dob: response.data[i].date_of_birth,
            gender: response.data[i].gender,
            picture: response.data[i].picture,
            aboutme: response.data[i].about_me,
            rate: response.data[i].rate,
          });
        }
        setSearchLoading(false);
        setbabysitterslist(usersarray);
      });
  }

  function getbabysitterstoMap() {
    let usersarray = [];
    setbabysitterListMap([]);
    axios
      .get(process.env.REACT_APP_API_URL + `/getAllBabysitters`)
      .then((response) => {
        //console.log(response);
        console.log(response.data[0]);
        for (let i = 0; i < response.data.length; i++) {
          usersarray.push({
            id: response.data[i].user_id,
            firstname: response.data[i].first_name,
            lastname: response.data[i].last_name,
            phone: response.data[i].phone_number,
            addressID: response.data[i].address_id,
            lat: response.data[i].address_latitude,
            long: response.data[i].address_longitude,
            dob: response.data[i].date_of_birth,
            gender: response.data[i].gender,
            picture: response.data[i].picture,
          });
        }
        setbabysitterListMap(usersarray);
        setbabysitterformapLoaded(true);
      });
  }

  function GetBabysitterInfo() {
    setloadingInfo(false);

    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/babysitterDetailswithRating/" +
          chosenBabysitter
      )
      .then((response) => {
        console.log("Chosen babysitter" + response);
        //console.log(response);
        let usersarray = [];
        setbabysitterInfo([]);
        usersarray.push({
          userid: response.data[0].id,
          firstname: response.data[0].first_name,
          lastname: response.data[0].last_name,
          address_id: response.data[2].id,
          picture: response.data[1].picture,
          babysitter_id: response.data[1].id,
          user_lat: response.data[2].address_latitude,
          user_long: response.data[2].address_longitude,
          user_city: response.data[2].city_id,
          user_country: response.data[2].country,
          phone: response.data[1].phone_number,
          gender: response.data[1].gender,
          dob: response.data[1].date_of_birth,
          aboutme: response.data[1].about_me,
          rate: response.data[1].rate,
          CV: response.data[1].qualifications,
          rating: response.data[3],
        });
        setbabysitterInfo(usersarray);
        //setbabysitterinfoloaded(true);

        console.log(usersarray);
        setloadingInfo(true);
      });
  }

  function getAppointments() {
    setAppListLoaded(false);
    let usersarray = [];
    setAppointmentLast([]);
    if (status === 0) {
      axios
        .get(process.env.REACT_APP_API_URL + `/getPending`)
        .then((response) => {
          //console.log(response);
          console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            usersarray.push({
              user_id: response.data[i].user_id,
              start: response.data[i].start_time,
              end: response.data[i].end_time,
              AppointmentDetails: response.data[i].details,
              firstname: response.data[i].first_name,
              lastname: response.data[i].last_name,
              AppID: response.data[i].appointment_ID,
              AppDetailsID: response.data[i].AppDetailsID,
              Pending: true,
            });
          }
          setAppointmentLast(usersarray);
          setAppListLoaded(true);
        });
    } else {
      axios
        .get(process.env.REACT_APP_API_URL + `/getScheduled`)
        .then((response) => {
          //console.log(response);
          console.log(response);
          for (let i = 0; i < response.data.length; i++) {
            usersarray.push({
              user_id: response.data[i].user_id,
              start: response.data[i].start_time,
              end: response.data[i].end_time,
              AppointmentDetails: response.data[i].details,
              firstname: response.data[i].first_name,
              lastname: response.data[i].last_name,
              AppID: response.data[i].appointment_ID,
              AppDetailsID: response.data[i].AppDetailsID,
              Pending: false,
            });
          }
          setAppointmentLast(usersarray);
          setAppListLoaded(true);
        });
    }
  }

  return (
    <>
      <CssBaseline />
      <Header
        showAppointment={true}
        setopenProfile={setopenProfile}
        setopenAppointmentsList={setopenAppointmentsList}
        getAppointments={getAppointments}
        notificationList={notificationList}
        NotificationRead={NotificationRead}
        notificationCount={notificationCount}
        loadNotifcations={loadNotifcations}
        getNotification={getNotification}
      />
      <Grid container spacing={1} style={{ width: "100%" }}>
        <Grid item xs={12} md={4} style={{ padding: "15px" }}>
          <Typography variant="h6"> Babysitters in your city</Typography>
          <TextField
            variant="standard"
            label="Search"
            fullWidth
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style={{
              marginBottom: "15px",
              background: "white",
              border: "none",
              marginTop: "5px",
            }}
            InputProps={{
              endAdornment: <SearchIcon onClick={SearchResult} />,
            }}
          />
          <Paper style={{ height: "75vh", overflow: "auto" }}>
            <ListMUI sx={{ width: "100%", bgcolor: "background.paper" }}>
              {listloaded === false || SearchLoading === true ? (
                <h5 style={{ textAlign: "center" }}>loading...</h5>
              ) : babysitterslist.length !== 0 ? (
                <List
                  babysitterlist={babysitterslist}
                  openprofile={setopenBabysitterProfile}
                  setchosenBabysitter={setchosenBabysitter}
                  chosenBabysitter={chosenBabysitter}
                />
              ) : (
                <h3>Sorry, no available babysitters in your city.</h3>
              )}
            </ListMUI>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card style={{ width: "100vw", height: "100%" }}>
            {babysitterformapLoaded === true ? (
              <Map
                locationLat={userLatitude}
                locationLong={userlongitude}
                babysitterList={babysitterListMap}
              />
            ) : (
              <div>Loading</div>
            )}
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              onClick={(e) => {
                setopenfeelinglucky(true);
              }}
              aria-label="add"
              style={{ position: "absolute", bottom: 30, right: 16 }}
            >
              <InsertInvitationOutlinedIcon sx={{ mr: 1 }} />
              Book Appointment
            </Fab>
          </Card>
        </Grid>
      </Grid>

      <Popup
        title="Profile"
        openPopup={openBabysitterProfile}
        setOpenPopup={setopenBabysitterProfile}
      >
        {babysitterinfoloaded === true ? (
          <BabysitterProfile
            openbooking={setopenbookApp}
            babysitterInfo={babysitterInfo}
            loadingInfo={loadingInfo}
            setopenRate={setopenRate}
            setopenViewRating={setopenViewRating}
          />
        ) : (
          <div>loading...</div>
        )}
      </Popup>

      <Popup
        title="Appointment Request"
        openPopup={openbookApp}
        setOpenPopup={setopenbookApp}
      >
        <Appointment babysitterInfo={babysitterInfo} parentInfo={userProfile} />
      </Popup>

      <Popup
        title="Book Appointment"
        openPopup={openbookApp}
        setOpenPopup={setopenbookApp}
      >
        <Appointment babysitterInfo={babysitterInfo} parentInfo={userProfile} />
      </Popup>

      <Popup
        title="Book Appointment"
        openPopup={openfeelinglucky}
        setOpenPopup={setopenfeelinglucky}
      >
        <FeelinglingLucky parentInfo={userProfile} />
      </Popup>

      <Popup
        title="My Profile"
        openPopup={openProfile}
        setOpenPopup={setopenProfile}
      >
        <ParentProfile user={userProfile} />
      </Popup>
      <Popup
        title="Appointments"
        openPopup={openAppointmentsList}
        setOpenPopup={setopenAppointmentsList}
      >
        <Appointments_list
          status={status}
          setStatus={setstatus}
          AppointmentList={AppointmentList}
          ListLoaded={AppListLoaded}
          getAppointments={getAppointments}
        />
      </Popup>

      <Popup
        title="Rate Babysitter"
        openPopup={openRate}
        setOpenPopup={setopenRate}
      >
        <Rate babysitterInfo={babysitterInfo} parentInfo={userProfile} />
      </Popup>

      <Popup
        title="Ratings"
        openPopup={openViewRating}
        setOpenPopup={setopenViewRating}
      >
        <ViewRating babysitterInfo={babysitterInfo} />
      </Popup>
    </>
  );
}

export default Main_parent;
