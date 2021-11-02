import React, { useState } from 'react';
//import GoogleMapReact from 'google-map-react';
import ReactMapGl, { GeolocateControl, Marker } from 'react-map-gl';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@mui/material/Rating';
import axios from 'axios';

import useStyles from './styles';
import Pin from './pin';
const geolocateControlStyle = {
    right: 10,
    top: 10
};



const Map = (props) => {
    console.log("Map Rendering");
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');

    const [longitude, setlongitude] = useState(props.locationLong);
    const [latitude, setlatitude] = useState(props.locationLat);

    const [viewport, setviewport] = useState({
        latitude: latitude,
        longitude: longitude,
        width: "100%", //or full width then set width: "100vw",
        height: "100%", //full height then set height: "100vh",
        zoom: 14,
        optimize: true
    })


    return (

        <div className={classes.mapContainer}>
            <ReactMapGl
                {...viewport}
                mapboxApiAccessToken={"pk.eyJ1IjoicmV3YS1zaCIsImEiOiJja3V4OXh6OHowYzZoMnVxcXpyeDl5Mzk4In0.bq95kU9a4bKrKr0VxOyF2w"}
                onViewportChange={viewport => {
                    setviewport(viewport);
                }}>

                <Marker
                    longitude={longitude}
                    latitude={latitude}
                    offsetTop={-20}
                    offsetLeft={-10}
                >
                    <Pin size={20} />

                </Marker>

            </ReactMapGl>
        </div >





    );
}

export default Map;