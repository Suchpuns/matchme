import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const EventComplete = () => {
  const {eventName} = useParams();
  console.log(eventName);
    return (
      <>
        <Header eventName={eventName ? eventName : 'New Event'} index='2'/>
        <p style={{color: 'black'}}>complete</p>
        <button>pressme</button>
      </>
    );
  }
  
  export default EventComplete;