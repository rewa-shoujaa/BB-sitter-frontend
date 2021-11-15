import React, { useState,useEffect, useRef } from 'react';

import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles, withStyles } from "@material-ui/core/styles";


const useStyles =makeStyles(theme =>({
  root:{
      '&$selected':{
        backgroundColor: '#2E3B55',
      },
      "&:hover": {
        backgroundColor: '#f5f5f5',
      }
  }
}))
export default function AppointmentsList(props) {
  console.log(props);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const classes = useStyles();
    return (
      <>
       {props.PendingList.map((app) => {
         return(
           <div key={app.AppDetailsID} className={classes.root}>
        <ListItem alignItems="flex-start" onClick={()=>{props.setChosen(app); props.error(null); props.success(null); setSelectedIndex(app.AppDetailsID)}} selected={selectedIndex === app.AppDetailsID}>
          <ListItemAvatar>
            <Avatar alt={app.firstname} src={process.env.REACT_APP_Media_URL+ app.picture}/>
          </ListItemAvatar>
          <ListItemText
            primary= {<Typography sx={{fontWeight:'bold'}}>{app.firstname + " " + app.lastname}</Typography>}
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