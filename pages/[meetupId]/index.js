import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupDetails from "../../components/meetups/MeetupDetails";

export default function Details(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content="Add Your Own Meetup Here" />
      </Head>
      <MeetupDetails details={props} />
    </Fragment>
  );
}

export async function getStaticPaths() {
  // because we are in a dynamic page [meetupId] so NextJS needs to know all
  // the possible paths can be generated from the current URL
  const client = await MongoClient.connect(
    "mongodb+srv://ahmed:12345@cluster0.y3aib.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    "mongodb+srv://ahmed:12345@cluster0.y3aib.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMeetup = await meetupCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
