import React, { useState } from "react";
import ListMUI from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
}));

const List = (props) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const classes = useStyles();

  return (
    <>
      {props.babysitterlist.map((babysitter) => {
        console.log(babysitter);
        return (
          <div key={babysitter.id} className={classes.root}>
            <ListItem
              elevation={6}
              alignItems="flex-start"
              id={babysitter.id}
              onClick={() => {
                props.openprofile(true);
                console.log(babysitter.id);
                props.setchosenBabysitter(babysitter.id);
                setSelectedIndex(babysitter.id);
              }}
              selected={selectedIndex === babysitter.id}
            >
              <ListItemAvatar>
                <Avatar
                  alt={babysitter.firstname}
                  src={process.env.REACT_APP_Media_URL + babysitter.picture}
                />
              </ListItemAvatar>
              <ListItemText
                primary={babysitter.firstname + " " + babysitter.lastname}
                secondary={
                  <React.Fragment>
                    {babysitter.aboutme ? " — " + babysitter.aboutme : null}

                    {babysitter.rate ? (
                      <Typography
                        component="div"
                        style={{
                          fontWeight: 500,
                          fontSize: 14,
                          color: "#002984",
                        }}
                      >
                        {babysitter.rate + " $/hour"}{" "}
                      </Typography>
                    ) : null}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      })}
    </>
  );
};

export default List;
