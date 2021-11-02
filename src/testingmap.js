import React, { useState,useEffect, useRef } from 'react';
import { CssBaseline, Grid} from '@material-ui/core';
import Map from './components/Maptest/Map';

function MapTesting() {
    const [openApp, setopenApp]= useState(false);
  
  
    /////get token from local storage
   /* const getAuthState = async () => {
      try {
        const authDataString = await localStorage.getItem("auth");
        const authData = JSON.parse(authDataString || {});
        console.log("this is from main")
        console.log(authData);
        console.log(authData.token)
        axios.defaults.headers["Authorization"] = "bearer"+authData.token;
      } catch (err) {
        console.log(err)
      }
    };
  
    useEffect(() => {
      getAuthState();
    }, []);*/
  
  
  
    return (
  <>
      <CssBaseline />
      <Grid container spacing={1} style={{width:'100%'}}>
      <Grid item xs={12} md={4}>
         
      </Grid>
      <Grid item xs={12} md={8}>
          <Map />
      </Grid>
  
      </Grid>
  
    
      
  
  </>
        
    );
  }
  
  export default  MapTesting;