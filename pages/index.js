import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import Meetuplist from "../components/meetups/MeetupList";

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta name="description" content="Meetups website to add your meetup" />
      </Head>
      <Meetuplist meetups={props.meetups} />
    </Fragment>
  );
}

// the data that normally be fetched in the second cycle of rendering
// we get it in the first cycle of the render now and send it with the
// page
// all the codes here will be exectued in the build process

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://ahmed:12345@cluster0.y3aib.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();
  // fetch the data from the database
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
    // re-pre-render the page every 1 secs to avoid fetching an out of
    // date data when using getStaticProps
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   // fetch the data from the database
//   return {
//     props: DUMMY,
//   };
//   // here the page will be re-rendered every incoming request
// }
