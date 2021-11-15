import React from 'react'
import "./Card.css"

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';

export default function Card_Profile_babysitter(props) {
    console.log(props.babysitterInfo);
    return (

        <Card elevation={6}>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center",backgroundColor: '#2E3B55', padding:'15px'}}>

        <Avatar
          alt={props.babysitterInfo[0].firstname}
          src={props.babysitterInfo[0].picture?process.env.REACT_APP_Media_URL+props.babysitterInfo[0].picture:process.env.REACT_APP_Media_URL+"/image/User.jpg"}
          style={{height:'20vw',width:'20vw'}}
        />
        </div>
     
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.babysitterInfo[0].firstname+" "+ props.babysitterInfo[0].lastname}
        </Typography>
                  {props.babysitterInfo[0].gender?<Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
                  Gender: 
                  <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+ props.babysitterInfo[0].gender}</Box> 
                  </Typography>:null}
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
    </Card>
        
    )
}
