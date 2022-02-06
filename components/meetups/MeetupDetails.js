import { Fragment } from "react";
import classes from "./MeetupDetails.module.css";

export default (props) => {
  return (
    <section className={classes.detail}>
      <h1>{props.details.meetupData.title}</h1>
      <img src={props.details.meetupData.image}></img>
      <address>{props.details.meetupData.address}</address>
      <p>{props.details.meetupData.description}</p>
    </section>
  );
};
