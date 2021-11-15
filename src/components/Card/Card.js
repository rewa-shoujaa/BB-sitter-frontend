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
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

export default function CardProfile(props) {
    console.log(props);
    return (

        <Card elevation={6}>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center",backgroundColor: '#2E3B55', padding:'15px'}}>

          <Avatar
            alt={props.babysitterInfo[0].firstname}
            src={props.babysitterInfo[0].picture?process.env.REACT_APP_Media_URL+props.babysitterInfo[0].picture:process.env.REACT_APP_Media_URL+"/image/User.jpg"}
            style={{height:'15vw',width:'15vw'}}
          />
          </div>
          
      
      <CardContent>
      <Grid container>
                 <Grid item xs={5} >
        <Typography gutterBottom variant="h5" component="div">
        {props.babysitterInfo[0].firstname+" "+ props.babysitterInfo[0].lastname}
        </Typography>
        </Grid>
        <Grid item xs={7} >
        {props.babysitterInfo[0].rating>0? <Rating name="half-rating-read" value={props.babysitterInfo[0].rating} precision={0.1} readOnly style={{paddingRight:'20px'}}/>:null}
        
         
        </Grid>
        
        </Grid>
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
      

        <Button variant="contained" endIcon={<InsertInvitationOutlinedIcon />} onClick={()=>{props.openbooking(true)}}  style={{backgroundColor: '#2E3B55', color: '#FFFFFF'}}>
          Request Appointment 
        </Button>
        <Button variant="contained" endIcon={<GradeIcon />}  onClick={()=>{props.setopenViewRating(true)}}  style={{backgroundColor: '#2E3B55', color: '#FFFFFF'}}>
          View Ratings 
        </Button>
        <Button variant="contained" endIcon={<GradeIcon />} onClick={()=>{props.setopenRate(true);console.log("Rate")}} style={{backgroundColor: 'Orange', color: '#FFFFFF'}} >
            Rate Babysitter
          </Button>
       
      </CardActions>
    </Card>
        
    )
}
