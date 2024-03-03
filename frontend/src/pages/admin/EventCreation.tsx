import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const EventCreation = () => {
  const { eventName } = useParams();

  return (
    <>
      <Header eventName={eventName ? eventName : "New Event"} index="0" />
      <p style={{ color: "black" }}>create</p>
      <button>pressme</button>
    </>
  );
};

export default EventCreation;
