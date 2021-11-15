import React, { useState, useEffect, useRef } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Map from "./components/Maptest/Map";

function MapTesting() {
  const [openApp, setopenApp] = useState(false);

  return (
    <>
      <CssBaseline />
      <Grid container spacing={1} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
    </>
  );
}

export default MapTesting;
