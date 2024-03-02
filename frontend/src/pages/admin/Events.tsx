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
  },
  {
    name: '1531 groupings',
    status: '2',
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
  },
  {
    name: '1531 groupings',
    status: '2',
    roles: 12,
    teams: 1,
    participants: 30,
  },
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
      <div className="flex items-center flex-col">

        <div className="flex flex-row my-5 items-start w-10/12 px-10">
          <h1 className="m-10 mx-0 text-3xl font-bold text-theme-cream">Welcome to&nbsp; </h1>
          <h1 className="m-10 mx-0 text-3xl font-bold text-theme-cream underline decoration-card-orange decoration-4 hover:decoration-card-blue">MatchMe</h1>
          <h1 className="m-10 mx-0 text-3xl font-bold text-theme-cream">!</h1>
        </div>

        <div className="inline-grid grid-cols-3 gap-2 w-10/12">

          <button className="border-4 border-theme-cream border-dashed rounded-3xl m-5 my-2 text-theme-cream hover:bg-black/20 font-semibold">
            Create a new Event
          </button>

          {getEvents}
        </div>
      

      </div>
    );
  }
  
  export default Events;