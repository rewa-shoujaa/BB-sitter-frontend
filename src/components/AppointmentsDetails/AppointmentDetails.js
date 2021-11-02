import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Map from '../Maptest/Map';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';



export default function AppointmentsDetails(props) {
  console.log(props);

  return (
    <Card style={{width:'100vw', height:'100%'}}>
     {props.chosen.lat ||props.chosen.long?
     <Map locationLat={props.chosen.lat} locationLong={props.chosen.long}/>:null}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.chosen.firstname + " " + props.chosen.lastname}
        </Typography>
        <Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
            Start: 
            <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+props.chosen.start}</Box> 
        </Typography>
        <Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
          End: 
          <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+props.chosen.end}</Box> 
        </Typography>
        <Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
          Phone Number: 
          <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+props.chosen.phone}</Box> 
        </Typography>
        <Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
          Details: 
          <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+props.chosen.AppointmentDetails}</Box> 
        </Typography>
      </CardContent>
      <CardActions>

        {props.chosen.Pending?<>
      <Button variant="contained" endIcon={<CheckIcon />} color="success" onClick={()=>{props.approve(props.chosen.AppDetailsID)}}>
        Approve
      </Button>
      <Button variant="contained" endIcon={<ClearIcon />} color="error" onClick={()=>{props.decline(props.chosen.AppDetailsID)}}>
        Decline
      </Button>
      </>
    :null}

      </CardActions>
    </Card>
  );
}