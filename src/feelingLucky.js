import React, { useState,useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Paper, makeStyles } from '@material-ui/core';
import Moment from 'moment';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Map from './components/MapDragable/Map';
import Button from '@mui/material/Button';
import {useHistory} from'react-router-dom';
import Alert from '@mui/material/Alert';



const useStyles =makeStyles(theme =>({
    root:{
        '& .MuiFormControl-root':{
            width: '80%',
            margin:theme.spacing(1)
        }
    },
    pageContent:{
        margin:theme.spacing(5),
        padding:theme.spacing(3),
  },
}))



export default function FeelinglingLucky (props) {

    //history.go(-1);
    //history.push("/");

    let history = useHistory();

    const [startDate, setStartDate]=useState(new Date());
    const[endDate, setEndDate]=useState(new Date());
    const [details,setdetails]=useState("");
    const [error, seterror]=useState(null);
    const [success, setsuccess]=useState(null);


    const classes =useStyles();
    const render =useRef(false);

  
    console.log(props)
    const handleSubmit = (event) => {
        event.preventDefault();
        if(startDate< (Moment().format("YYYY-MM-DD[T]hh:mm")) || endDate < Moment().format("YYYY-MM-DD[T]hh:mm")){
            console.log("error start and end time should be greater than the current date/time")
            seterror("Start and end date/time should be greater than the current date/time");
            setsuccess(null);
        }
        else if(startDate>endDate){
            console.log("error ")
            seterror("End date/time should not be greater than end date/time ")
            setsuccess(null);
        }
        else if (Moment(endDate, "YYYY-MM-DD[T]hh:mm").diff(Moment(startDate, "YYYY-MM-DD[T]hh:mm"), 'hours')>8){
            console.log("Appointment should not exceed 8 hours ")
            seterror("Appointment should not exceed 8 hours")
            setsuccess(null); 
        }
        else{
        
        axios.post(process.env.REACT_APP_API_URL+'/FeelingLucky', {
          "address_ID": props.parentInfo[0].address_id,
          "end_time": endDate,
          "start_time": startDate,
          "Parentid": props.parentInfo[0].parent_id,
          "city": props.parentInfo[0].user_city,
          "details":details

          })
        .then(function (response) {
            seterror(null);
            setsuccess("Appointment request was sent");
            setStartDate(new Date());
            setEndDate(new Date());
            setdetails("");
        

        })
            .catch(function (error) {
              console.log(error)
              alert("Please Try again later")
              setStartDate(new Date());
              setEndDate(new Date());
              setdetails("");
        
        
            })
        }
      }

  


     useEffect(() => {
        let dateNow=new Date
        console.log(dateNow)
        console.log(Moment().format("YYYY-MM-DD[T]hh:mm"))
    }, []);
    
   

     
    
      return (
          <>
          <div style={{marginBottom:'15px'}}>
          <Typography variant="subtitle2" component="h2">
              By using this automatic booking feature the system will automatically select several babysitters located around you and send them an appointment request.
            </Typography>
            </div>
          
         <form className={classes.root} validate onSubmit={handleSubmit}>
             <Grid container >
                 <Grid item md={6} xs={12} >
                  <TextField
                  id="datetime-start"
                  label="From"
                  required
                  value={startDate}
                  onChange={(e)=>{setStartDate(e.target.value);console.log(e.target.value)}}
                  fullWidth
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                    }}
                    />
                 </Grid>
                 <Grid item md={6} xs={12}>
                 <TextField
                 id="datetime-end"
                 label="appointment"
                 type="datetime-local"
                 value={endDate}
                 onChange={(e)=>{setEndDate(e.target.value); console.log(e.target.value)}}
                 required
                 fullwidth
                 label="To"
                 InputLabelProps={{
                   shrink: true,
                  }}
                  />



                    
                 </Grid>
                 <Grid item xs={12}>

                 <TextField 
                     variant="outlined"
                     label="Details"
                     name="detail"
                     autoComplete="off"
                     style={{width:"95%"}}
                     multiline
                     rows={4}
                     value={details}
                     onChange={(e)=>{setdetails(e.target.value)}}
                     placeholder="Number of children, ages, special requests..."
                     />

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
      
                     <Button
                     type="submit"
                     style={{backgroundColor: '#2E3B55', color: '#FFFFFF', width:'25%'}}
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}>
                         Book
                    </Button>
                    </div>

                    {error? <Alert severity="error">{error}</Alert> : null}
                    {success?  <Alert severity="success">{success}</Alert>: null}
                 

                 </Grid>




             </Grid>

         </form>
        
         </>
       
      );
      }
      