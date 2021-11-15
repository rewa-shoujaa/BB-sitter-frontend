import React, { useState, useEffect, useRef } from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import ListMUI from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";

export default function ViewRating(props) {
  const [ratinglist, setratinglist] = useState([]);
  const [loading, setLoading] = useState(false);

  function getRating() {
    let array = [];
    setratinglist([]);
    setLoading(false);
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/GetRatings/" +
          props.babysitterInfo[0].babysitter_id
      )
      .then((response) => {
        console.log("ratings", response);
        for (let i = 0; i < response.data.length; i++) {
          array.push({
            rating: response.data[i].rating,
            comment: response.data[i].comment,
          });
        }
        setratinglist(array);
        setLoading(true);
      });
  }

  useEffect(() => {
    getRating();
  }, []);
  console.log(props);
  return (
    <>
      <Paper style={{ height: "75vh", overflow: "auto" }}>
        <ListMUI sx={{ width: "100%", bgcolor: "background.paper" }}>
          {loading ? (
            setratinglist.length > 0 ? (
              ratinglist.map((rating, i) => {
                return (
                  <div key={i}>
                    <ListItem alignItems="flex-start">
                      <Rating
                        name="half-rating-read"
                        value={rating.rating}
                        readOnly
                        style={{ paddingRight: "20px" }}
                      />
                      <Typography sx={{ fontWeight: "bold" }}>
                        {rating.comment}
                      </Typography>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                );
              })
            ) : (
              <div>no ratings available</div>
            )
          ) : (
            <div>Loading...</div>
          )}
        </ListMUI>
      </Paper>
    </>
  );
}
