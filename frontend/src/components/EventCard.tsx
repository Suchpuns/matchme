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
      color: 'blue',
      path: 'create'
    },
    {
      text: 'Getting preferences...',
      color: 'orange',
      path: 'preference'
    },
    {
      text: 'Completed!',
      color: 'green',
      path: 'complete'
    }
  ]

  return(
    <button onClick={() => {navigate(!isNaN(stateNum) ? `/admin/${props.name}/${statusItem[stateNum].path}` : '/')}}>
      <p>{props.name}</p>
      <p>{!isNaN(stateNum) ? statusItem[stateNum].text : '--'}</p>

      <p>{props.roles}</p>
      <p>roles</p>

      <p>{props.teams}</p>
      <p>teams</p>

      <p>{props.participants}</p>
      <p>participants</p>
    </button>
  );
}

export default EventCard;