import React, { useState,useEffect, useRef } from 'react';

import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function AppointmentsList(props) {
  console.log(props);
    return (
      <>
       {props.AppointmentList.map((app) => {
         return(
           <div key={app.AppDetailsID}>
        <ListItem alignItems="flex-start" >
          <ListItemAvatar>
            <Avatar alt={app.firstname} src={"http://127.0.0.1:8000" + app.picture}/>
          </ListItemAvatar>
          <ListItemText
            primary= <Typography sx={{fontWeight:'bold'}}>{app.firstname + " " + app.lastname}</Typography>
            secondary={
              <React.Fragment>
              
                  <Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
                  Start: 
                  <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+app.start}</Box> 
                  </Typography>
                  <Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
                  End: 
                  <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+app.end}</Box> 
                  </Typography>
                  <Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
                  Details: 
                  <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+app.AppointmentDetails}</Box> 
                  </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        </div>
         )
          })
        }
      </>
    );
  }