import React, { useState, useCallback, useEffect } from 'react';
//import GoogleMapReact from 'google-map-react';
import ReactMapGl, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@mui/material/Rating';

import ControlPanel from './control-panel';
import Pin from './pin';

import useStyles from './styles';
const geolocateControlStyle = {
    right: 10,
    top: 10
};

const navStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};
const Map = (props) => {
    console.log("Registration Map")
    const classes = useStyles();
    const isMobile = useMediaQuery('(min-width:600px)');
    const [viewport, setviewport] = useState({
        latitude: 33.888630,
        longitude: 35.495480,
        width: "100%", //or full width then set width: "100vw",
        height: "100%", //full height then set height: "100vh",
        zoom: 14,
        optimize: true
    })

    const [marker, setMarker] = useState({
        latitude: 33.888630,
        longitude: 35.495480
    });
    const [events, logEvents] = useState({});

    const onMarkerDragStart = useCallback(event => {
        logEvents(_events => ({ ..._events, onDragStart: event.lngLat }));
    }, []);

    const onMarkerDrag = useCallback(event => {
        logEvents(_events => ({ ..._events, onDrag: event.lngLat }));
    }, []);

    const onMarkerDragEnd = useCallback(event => {
        logEvents(_events => ({ ..._events, onDragEnd: event.lngLat }));
        setMarker({
            longitude: event.lngLat[0],
            latitude: event.lngLat[1]
        });
        props.setLat(event.lngLat[1]);
        props.setLng(event.lngLat[0]);
    }, []);

    const UserPosition = () => {
        var options = {
            enableHighAccuracy: true,
        };

        function success(pos) {
            var crd = pos.coords;
            setMarker({
                longitude: crd.longitude,
                latitude: crd.latitude
            });
            setviewport({
                ...viewport,
                longitude: crd.longitude,
                latitude: crd.latitude
            })

            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);

    }
    /*const mapRef = "";
    const geolocate = "";

    mapRef.on('load', () => {
        geolocate.trigger();
    });*/
    useEffect(() => { UserPosition() }, [])




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
                    showUserHeading={true}
                    onGeolocate={UserPosition}

                />


                <Marker
                    longitude={marker.longitude}
                    latitude={marker.latitude}
                    offsetTop={-20}
                    offsetLeft={-10}
                    draggable
                    onDragStart={onMarkerDragStart}
                    onDrag={onMarkerDrag}
                    onDragEnd={onMarkerDragEnd}
                >
                    <Pin size={20} />

                </Marker>
                <div className="nav" style={navStyle}>
                    <NavigationControl />
                </div>


            </ReactMapGl>


        </div >





    );
}

export default Map;