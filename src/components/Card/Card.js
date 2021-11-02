import React from 'react'
import "./Card.css"

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import GradeIcon from '@mui/icons-material/Grade';

export default function CardProfile(props) {
    console.log(props);
    return (

        <Card elevation={6}>
      <CardMedia
        component="img"
        alt={props.babysitterInfo[0].firstname}
        width='100vw'
        style={{height:300}}
        image={props.babysitterInfo[0].picture?process.env.REACT_APP_Media_URL+props.babysitterInfo[0].picture:process.env.REACT_APP_Media_URL+"/image/User.jpg"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.babysitterInfo[0].firstname+" "+ props.babysitterInfo[0].lastname}
        </Typography>
                  <Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
                  Gender: 
                  <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+ props.babysitterInfo[0].gender?" Female":" Male"}</Box> 
                  </Typography>
                  {props.babysitterInfo[0].dob?<Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
                  Date of Birth: 
                  <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+ props.babysitterInfo[0].dob}</Box> 
                  </Typography>:null}
                  {props.babysitterInfo[0].rate?<Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
                  Rate: 
                  <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+ props.babysitterInfo[0].rate}</Box> 
                  </Typography>:null}
                  {props.babysitterInfo[0].phone?<Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
                  Mobile: 
                  <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+ props.babysitterInfo[0].phone}</Box> 
                  </Typography>:null}
                  {props.babysitterInfo[0].aboutme?<Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
                  About me: 
                  <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+ props.babysitterInfo[0].aboutme}</Box> 
                  </Typography>:null}
                  {props.babysitterInfo[0].CV?<Link target="_blank" rel="noopener" href={process.env.REACT_APP_Media_URL+props.babysitterInfo[0].CV}>CV</Link>:null}
      </CardContent>
      
      <CardActions>
      <Button variant="contained" endIcon={<GradeIcon />} onClick={()=>{props.setopenRate(true);console.log("Rate")}} style={{backgroundColor: 'Orange', color: '#FFFFFF'}} >
            Rate
        </Button>
        <Button variant="contained" endIcon={<InsertInvitationOutlinedIcon />} onClick={()=>{props.openbooking(true)}}  style={{backgroundColor: '#2E3B55', color: '#FFFFFF'}}>
            Appointment request
        </Button>
      </CardActions>
    </Card>
        
    )
}
