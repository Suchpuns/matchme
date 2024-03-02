
import EditableTable from "../../components/EditableTable";

import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const EventCreation = () => {
  const {eventName} = useParams();

  return (
    <>
      <Header eventName={eventName ? eventName : 'New Event'} index='0'/>
      <div className = "h-full">
        <div className = "h-full grid grid-cols-3 gap-8">
          <div className = "col-span-1"></div>
          <div className = "col-span-2">
          <EditableTable/>
          </div>
        </div>
      </div>

    </>
  );
}

export default EventCreation;