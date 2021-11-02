import React, { useState, useEffect } from 'react';
//import GoogleMapReact from 'google-map-react';
import ReactMapGl, { GeolocateControl, Marker, Popup } from 'react-map-gl';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@mui/material/Rating';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import useStyles from './styles';
const geolocateControlStyle = {
    right: 10,
    top: 10
};

const Map = (props) => {
    console.log("Map runnung" + props.babysitterList);
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');
    const [viewport, setviewport] = useState({
        latitude: props.locationLat,
        longitude: props.locationLong,
        width: "100%", //or full width then set width: "100vw",
        height: "100%", //full height then set height: "100vh",
        zoom: 14,
        optimize: true
    })
    const [selectedBabysitter, setselectedBabysitter] = useState(null);




    return (

        <div className={classes.mapContainer}>
            <ReactMapGl
                {...viewport}
                mapboxApiAccessToken={"pk.eyJ1IjoicmV3YS1zaCIsImEiOiJja3V4OXh6OHowYzZoMnVxcXpyeDl5Mzk4In0.bq95kU9a4bKrKr0VxOyF2w"}
                onViewportChange={viewport => {
                    setviewport(viewport);
                }}>
                <GeolocateControl
                    style={geolocateControlStyle}
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}

                />
                {props.babysitterList.length > 0 ? props.babysitterList.map((babysitter) => {
                    return (
                        <Marker key={babysitter.id}
                            latitude={babysitter.lat}
                            longitude={babysitter.long}>

                            <button style={{ background: "none", border: "none" }} onClick={(e) => {
                                e.preventDefault();
                                setselectedBabysitter(babysitter);
                            }} >
                                <ChildFriendlyIcon style={{ color: "#f50057" }} />
                            </button>


                        </Marker>
                    )
                }) : null}

                {selectedBabysitter ?
                    <Popup latitude={selectedBabysitter.lat} longitude={selectedBabysitter.long}
                        onClose={() => { setselectedBabysitter(null) }}>
                        <div>
                            <h3>{selectedBabysitter.firstname + " " + selectedBabysitter.lastname}</h3>
                            <div><PhoneAndroidIcon />{selectedBabysitter.phone}</div>
                        </div>
                    </Popup>
                    : null}






            </ReactMapGl>
        </div >





    );
}

export default Map;