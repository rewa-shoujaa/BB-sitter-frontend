import React from 'react';
import Card_Profile_babysitter from './components/Card_Profile_babysitter/Card';
import { Paper, makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function My_Profile_babysitter(props) {

    return (
        <Box style={{width:"100%", height:"100%"}}> 

        <Card_Profile_babysitter babysitterInfo={props.user}/>
        
        </Box>
    )
}
