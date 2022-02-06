/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import Image from "next/image";
import { Fragment } from "react";
import classes from "./MeetupDetails.module.css";

export default (props) => {
  return (
    <section className={classes.detail}>
      <h1>{props.details.meetupData.title}</h1>
      <Image src={props.details.meetupData.image} alt="image"></Image>
      <address>{props.details.meetupData.address}</address>
      <p>{props.details.meetupData.description}</p>
    </section>
  );
};
