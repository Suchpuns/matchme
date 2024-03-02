import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const EventPrefs = () => {
  const {eventName} = useParams();

  return (
    <>
      <Header eventName={eventName ? eventName : 'New Event'} index='1'/>
      <p style={{color: 'black'}}>prefs</p>
      <button>pressme</button>
    </>
  );
}
  
  export default EventPrefs;