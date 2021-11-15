import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Paper, makeStyles } from "@material-ui/core";
import axios from "axios";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
  },
}));

export default function Rating_form(props) {
  //history.go(-1);
  //history.push("/");

  const [details, setdetails] = useState("");
  const [rating, setrating] = useState(3);
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const classes = useStyles();

  console.log(props);
  useEffect(() => {
    console.log(rating);
  }, [rating]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(process.env.REACT_APP_API_URL + "/rate", {
        rating: rating,
        ParentID: props.parentInfo[0].parent_id,
        babysitterID: props.babysitterInfo[0].babysitter_id,
        comment: details,
      })
      .then(function (response) {
        seterror(null);
        setsuccess("Thank you Rating was added!");
        setdetails("");
        setrating(3);

        // history.push("/");
      })
      .catch(function (error) {
        console.log(error);
        alert("Please Try again later");
        setdetails("");
        setrating(3);
      });
  };

  return (
    <>
      <form
        className={classes.root}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" component="h2">
              Rate Babysitter:{" "}
            </Typography>
            <Rating
              name="half-rating"
              value={rating}
              onChange={(event, newValue) => {
                setrating(newValue);
              }}
              precision={1}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Comments"
              name="detail"
              autoComplete="off"
              required
              fullWidth
              multiline
              rows={4}
              value={details}
              onChange={(e) => {
                setdetails(e.target.value);
              }}
            />

            <Button
              type="submit"
              fullWidth
              style={{ backgroundColor: "#2E3B55", color: "#FFFFFF" }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Rate
            </Button>

            {error ? <Alert severity="error">{error}</Alert> : null}
            {success ? <Alert severity="success">{success}</Alert> : null}
          </Grid>
        </Grid>
      </form>
    </>
  );
}
