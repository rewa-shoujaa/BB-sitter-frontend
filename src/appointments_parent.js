import React, { useState,useEffect } from 'react';


import FormControl from '@mui/material/FormControl';
import { CssBaseline, Grid} from '@material-ui/core';
import AppointmentList from './components/AppointmentList_Parent/List';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListMUI from '@mui/material/List';
import Paper from '@mui/material/Paper';




export default function Appointment_parent(props) {
    console.log(props);

    useEffect(()=>{
        props.getAppointments()
    },[props.status])

    return(
        <>
        <CssBaseline />
    <Grid container spacing={1} style={{width:'100%', height:'100%'}}>
    <Grid item xs={12} >
    <FormControl fullWidth style={{marginTop:"10px"}}>
            <Select id="type" value={props.status} onChange={(e)=>{props.setStatus(e.target.value); }}>
              <MenuItem value={0}>Pending</MenuItem>
              <MenuItem value={1}>Scheduled</MenuItem>
            </Select>
          </FormControl>
          <Paper style={{ height: '100%', overflow: 'auto' }}>
      <ListMUI sx={{ width: '100%', height: '100%',  bgcolor: 'background.paper' }}>

          {props.ListLoaded?
          props.AppointmentList.length>0?
          <AppointmentList  AppointmentList={props.AppointmentList} />
          :<div>No Appointments listed</div>:
          <div>Loading..</div>}
          </ListMUI>
      </Paper >
    </Grid>
    </Grid>
        </>
    )
}