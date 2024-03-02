import { useNavigate } from "react-router-dom";

type EventCardProps =  {
  name: string,
  status: string,
  roles: number,
  teams: number,
  participants: number,
}

const EventCard = (props: EventCardProps) => {
  const navigate = useNavigate();
  const stateNum = parseInt(props.status);
  const statusItem = [
    {
      text: 'Creating event',
      color: {
        backgroundColor: 'rgba(179, 227, 242, 0.8)'
      },
      path: 'create'
    },
    {
      text: 'Getting preferences...',
      color: {
        backgroundColor: 'rgba(244, 203, 154, 0.8)'
      },
      path: 'preference'
    },
    {
      text: 'Completed!',
      color: {
        backgroundColor: 'rgba(150, 234, 198, 0.8)'
      },
      path: 'complete'
    }
  ]

  return(
    <button 
      onClick={() => {navigate(!isNaN(stateNum) ? `/admin/${props.name}/${statusItem[stateNum].path}` : '/')}}
      className="rounded-3xl m-5 my-2 p-3 px-5 items-center hover:outline outline-2 outline-offset-2 drop-shadow-md"
      style={statusItem[stateNum].color}>
      
      <div className="flex flex-col text-left">
        <p className="text-2xl font-semibold leading-5">{props.name}</p>
        <p>{!isNaN(stateNum) ? statusItem[stateNum].text : '--'}</p>
      </div>
      

      <div className="flex flex-row m-2 mt-5 items-center justify-items-center">
        <div className='mx-4'>
          <p className="leading-3">{props.participants}</p>
          <p>Participants</p>
        </div>
        
        <div className='mx-4'>
          <p className="leading-3">{props.roles}</p>
          <p>Roles</p>
        </div>

        <div className='mx-4'>
          <p className="leading-3">{props.teams}</p>
          <p>Teams</p>
        </div>
      </div>
    </button>
  );
}

export default EventCard;