import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

export default function NewMeetup() {
  const router = useRouter();

  async function addMeetupHandler(meetupData) {
    const response = await fetch("/api/newMeetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add New Meetup</title>
        <meta name="description" content="Add Your Own Meetup Here" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}
