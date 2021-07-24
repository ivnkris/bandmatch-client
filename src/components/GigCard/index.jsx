import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Button from "../Button";

import "../../App.css";
import "./GigCard.css";

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//     backgroundColor: "#000000",
//     boxShadow: "none",
//     paddingTop: "25px",
//     color: "#FFFFFF",
//   },
//   media: {
//     height: 140,
//   },
// });

const GigCard = ({ title, date, time, genre, venue, url, buttonProps }) => {
  return (
    <Card className="gig-card-container">
      <CardActionArea>
        <CardMedia image={url} title="Contemplative Reptile" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" component="p">
            {date} @ {time}
          </Typography>
          <Typography variant="body2" component="p">
            {genre} GIG @ {venue}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button props={buttonProps} />
      </CardActions>
    </Card>
  );
};

export default GigCard;
