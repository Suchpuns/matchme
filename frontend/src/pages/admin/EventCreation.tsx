import EditableTable from "../../components/EditableTable";
const EventCreation = () => {
  return (
    <>
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