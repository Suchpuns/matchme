import PersonRow from "./PersonRow"

const RoleGrouping = ({role_name, people, desired}) => {
    const peopleList =  people.map(person => {
        return (
            <div className="ml-4">
                <PersonRow person={person}/>
            </div>
        )
    })

    console.log(role_name)
    return (
        <>
            <div className="font-bold text-italic">{role_name} ({people.length}/{desired})</div>
            {peopleList}
        </>
    )
}

export default RoleGrouping