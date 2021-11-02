import React, { useState,useEffect, useRef } from 'react';
import { CssBaseline, Grid} from '@material-ui/core';

import Header from './components/Header_babysitter/Header';
import AppointmentList from './components/AppointmentList/List';
import AppointmentDetails from './components/AppointmentsDetails/AppointmentDetails';
import Popup from './components/Popup';

import Profile from './myProfile_babysitter';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListMUI from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import {useHistory} from'react-router-dom';
import Alert from '@mui/material/Alert';


import localStorage from 'local-storage'
import { RateReview } from '@material-ui/icons';


function Main_parent(props) {
  let history = useHistory();

  const [openApp, setopenApp]= useState(false);
  const [status, setstatus] = useState(0);
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  
  const [userProfile, setuserProfile] = useState([]);
  const [pendingAppointmentList, setpendingAppointmentList] = useState([]);
  const [schedualedAppointmentList, setschedualedAppointmentList] = useState([]);
  const [chosenAppointmnet, setchosenAppointmnet] = useState(null);
  const [appointmentlistLoaded, setappointmentlistLoaded]=useState(false);
  const [openProfile, setopenProfile]= useState(false);
  const [loadNotifcations, setloadNotifcations]=useState(false);
  const [notificationList, setNotificationList]=useState([]);
  const [notificationCount, setnotificationCount]= useState(0);
  

  axios.defaults.baseURL="";

  /////get token from local storage
 const getAuthState = async () => {
    try {
      const authDataString = await localStorage.get("auth");
      const authData = JSON.parse(authDataString || {});
      console.log("Authhh"+authData);
      
      axios.defaults.headers["Authorization"] = "bearer"+authData.token;
      GetUserProfile();
      getAppointments();
      getNotification();
     // Set_Token();
    } catch (err) {
      console.log(err);
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

  useDidMountEffect(() =>{
    getNotification();
    props.setLoadNotification(false);
  },
  [props.loadNotifications])
  

  useEffect(() => {
    getAuthState();
  }, []);

  useDidMountEffect(() => {
    getAppointments();
  }, [status]);


  function getNotification(){
    let array=[]
    setNotificationList([])
    setloadNotifcations(false);
    axios.get(process.env.REACT_APP_API_URL+`/getNotifications`)
    .then((response)=>{ 
      console.log("notificationss",response);    
      for(let i=0;i<response.data.length;i++){
        array.push({
          notification:response.data[i].text,
        })
      } 
      setNotificationList(array);
      setloadNotifcations(true);
      setnotificationCount(array.length);

})
  }

  function NotificationRead(){
    let array=[]
    setNotificationList([])
    //setloadNotifcations(false);
    axios.get(process.env.REACT_APP_API_URL+`/setRead`)
    .then((response)=>{ 
      console.log(response);    
      setNotificationList([]);
      setnotificationCount(0);

})
  }


  function GetUserProfile() {

    axios.get(process.env.REACT_APP_API_URL+"/babysitter/getDetails")
          .then((response)=>{
            console.log(response);
            let usersarray=[];
            setuserProfile([]);
              usersarray.push({
                userid:response.data[0].id,
                firstname:response.data[0].first_name,
                lastname:response.data[0].last_name,
                address_id:response.data[2].id,
                img:response.data[1].picture,
                picture:response.data[1].picture,
                babysitter_id:response.data[1].id,
                user_lat:response.data[2].address_latitude,
                user_long:response.data[2].address_longitude,
                user_city:response.data[2].city_id,
                user_country:response.data[2].country,
                gender: response.data[1].gender,
                dob: response.data[1].date_of_birth,
                phone: response.data[1].phone_number,
                rate: response.data[1].rate,
                aboutme: response.data[1].about_me,
                CV:response.data[1].qualifications


              })
              setuserProfile(usersarray);

      })
    }
    

    function getAppointments(){
      setchosenAppointmnet(null);
      setappointmentlistLoaded(false)
      let usersarray=[]
      setpendingAppointmentList([]);
      if (status===0){
      axios.get(process.env.REACT_APP_API_URL+`/babysitter/getAppointments`)
      .then((response)=>{ 
        //console.log(response);  
        console.log(response);   
       for(let i=0;i<response.data.length;i++){
          usersarray.push({
            parentid: response.data[i].parent_id,
            user_id: response.data[i].user_id,
            start: response.data[i].start_time,
            end: response.data[i].end_time,
            AppointmentDetails: response.data[i].details,
            firstname:response.data[i].first_name,
            lastname:response.data[i].last_name,
            phone:response.data[i].phone_number,
            addressID:response.data[i].address_id,
            lat:response.data[i].address_latitude,
            long:response.data[i].address_longitude,
            dob:response.data[i].date_of_birth,
            gender:response.data[i].gender,
            picture:response.data[i].picture,
            AppID:response.data[i].appointment_ID,
            AppDetailsID:response.data[i].AppDetailsID,
            Pending:true
          })
        } 
        setpendingAppointmentList(usersarray);
        setappointmentlistLoaded(true);
        
  
  })
}
else{
  axios.get(process.env.REACT_APP_API_URL+`/babysitter/getScheduled`)
      .then((response)=>{ 
        //console.log(response);  
        console.log(response);   
       for(let i=0;i<response.data.length;i++){
          usersarray.push({
            parentid: response.data[i].parent_id,
            user_id: response.data[i].user_id,
            start: response.data[i].start_time,
            end: response.data[i].end_time,
            AppointmentDetails: response.data[i].details,
            firstname:response.data[i].first_name,
            lastname:response.data[i].last_name,
            phone:response.data[i].phone_number,
            addressID:response.data[i].address_id,
            lat:response.data[i].address_latitude,
            long:response.data[i].address_longitude,
            dob:response.data[i].date_of_birth,
            gender:response.data[i].gender,
            picture:response.data[i].picture,
            AppID:response.data[i].appointment_ID,
            AppDetailsID:response.data[i].AppDetailsID,
            Pending:false
          })
        } 
        setpendingAppointmentList(usersarray);
        setappointmentlistLoaded(true);
      })
    }
    }

    

    



    useDidMountEffect(() => {
      getAppointments();
    }, [status]);

    function Approve(App_ID) {

      axios.get(process.env.REACT_APP_API_URL+"/babysitter/AcceptAppointment/"+App_ID)
            .then((response)=>{
              console.log(response);
              if (response.data==="Success"){
                setsuccess("Appointment successfully scheduled")
              }
              else{
                seterror("Something went wrong, please try again later")
              }
        })
        getAppointments();
      }

      function Decline(App_ID) {

        axios.get(process.env.REACT_APP_API_URL+"/babysitter/DeclineAppointment/"+App_ID)
              .then((response)=>{
                console.log(response);
                if (response.data==="Success"){
                  setsuccess("Sucessfully declined")
                }
                else{
                  seterror("Something went wrong, please try again later")
                }
          })
          getAppointments();
        }

        //useEffect(()=>{console.log(openProfile)})
    



  return (
<>
    <CssBaseline />
    <Header showAppointment={false} setopenProfile={setopenProfile}  notificationList={notificationList} NotificationRead={NotificationRead} notificationCount={notificationCount} loadNotifcations={loadNotifcations} getNotification={getNotification}/>
    <Grid container spacing={1} style={{width:'100%', height:'100%'}}>
    <Grid item xs={12} md={5} style={{padding:'15px'}}>
    <Typography variant="h6"> Appointments</Typography>
    <FormControl fullWidth style={{marginTop:"10px"}}>
            <Select id="type" value={status} onChange={(e)=>{setstatus(e.target.value); setchosenAppointmnet(null)}} style={{marginBottom:'15px', marginTop:"5px"}}>
              <MenuItem value={0}>Pending</MenuItem>
              <MenuItem value={1}>Scheduled</MenuItem>
            </Select>
          </FormControl>
          <Paper style={{ height: '75vh', overflow: 'auto' }}>
      <ListMUI sx={{ width: '100%', height: '100%',  bgcolor: 'background.paper' }}>

          {appointmentlistLoaded?
          pendingAppointmentList.length>0?
          <AppointmentList  PendingList={pendingAppointmentList} setChosen={setchosenAppointmnet} error={seterror} success={setsuccess}/>
          :<div>No Appointments listed</div>:
          <div>Loading..</div>}
          </ListMUI>
      </Paper >
    </Grid>
    <Grid item xs={12} md={7}>
    {error? <Alert severity="error">{error}</Alert> : null}
    {success?  <Alert severity="success">{success}</Alert>: null}
    {chosenAppointmnet?<AppointmentDetails chosen={chosenAppointmnet} approve={Approve} decline={Decline}/>:null}
    </Grid>
   
    </Grid>

    <Popup 
    title = "My Profile"
    openPopup={openProfile}
    setOpenPopup={setopenProfile}
    >
      <Profile user={userProfile} />
    

    </Popup>
</>
      
  );
}

export default  Main_parent;