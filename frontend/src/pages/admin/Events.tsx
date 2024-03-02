import EventCard from "../../components/EventCard";

// dummy data for now
const events = [
  {
    name: 'Trainee Program',
    status: '0',
    roles: 12,
    teams: 1,
    participants: 30,
  },
  {
    name: 'Atlassian',
    status: '1',
    roles: 12,
    teams: 1,
    participants: 30,
  },
  {
    name: '2511 Pairings',
    status: '1',
    roles: 12,
    teams: 1,
    participants: 30,
  },
  {
    name: '1531 groupings',
    status: '2',
    roles: 12,
    teams: 1,
    participants: 30,
  }
]

const Events = () => {
  const getEvents = events.map(x => <EventCard 
    name={x.name}
    status={x.status}
    roles={x.roles}
    teams={x.teams}
    participants={x.participants}
    />)

    return (
      <>
        <h1>Welcome to MatchMe!</h1>
        <button>
          Create a new Event
        </button>
        {getEvents}

      </>
    );
  }
  
  export default Events;