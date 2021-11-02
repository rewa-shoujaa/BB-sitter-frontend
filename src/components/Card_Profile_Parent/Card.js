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

export default function CardProfile(props) {
    console.log(props.user);
    return (

        <Card elevation={6}>
      <CardMedia
        component="img"
        alt={props.user[0].firstname}
        width='100vw'
        style={{height:300}}
        image={props.user[0].img?process.env.REACT_APP_Media_URL+props.user[0].img:process.env.REACT_APP_Media_URL+"/image/User.jpg"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.user[0].firstname+" "+ props.user[0].lastname}
        </Typography>
                  <Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
                  Gender: 
                  <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+ props.user[0].gender? " Female":" Male"}</Box> 
                  </Typography>
                  {props.user[0].dob?<Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
                  Date of Birth: 
                  <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+ props.user[0].dob}</Box> 
                  </Typography>:null}
                  {props.user[0].phone?<Typography component='div' style={{ fontWeight: 600,  fontSize: 16}}>
                  Mobile: 
                  <Box fontWeight= 'light' display='inline' sx={{ fontSize: 14 }}>{" "+ props.user[0].phone}</Box> 
                  </Typography>:null}
                  
      </CardContent>
    </Card>
        
    )
}
