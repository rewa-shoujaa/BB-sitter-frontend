import React from "react";
import CardProfile from "./components/Card/Card";
import { Paper, makeStyles } from "@material-ui/core";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function Profile_babysitter(props) {
  return (
    <Box style={{ width: "100%", height: "100%" }}>
      <CardProfile
        openbooking={props.openbooking}
        babysitterInfo={props.babysitterInfo}
      />
    </Box>
  );
}
