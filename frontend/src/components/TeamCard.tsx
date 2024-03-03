import { SetStateAction, createContext, useContext, useState } from "react";
import { Role, Team, useEventContext } from "../pages/admin/EventCreation2";

type TeamCardProps = {
	team: Team;
}

const TeamCard = (props: TeamCardProps) => {
	const team = props.team;
	const [roles, setRoles] = useState<Role[]>(team.teamRoles);
	const [roleName, setRoleName] = useState<string>('');
	const [teams, setTeams] = useEventContext();

	const updateRoleName = (e: { target: { value: SetStateAction<string>; }; }) => {
		setRoleName(e.target.value);
	}

	console.log(teams);

	const addRole = () => {
		const searched = roles.find(x => x.roleName == roleName);
		if (searched) {
			searched.roleQuant++;
		} else {
			const newRole: Role = {
				roleName: roleName,
				roleQuant: 1
			}
			setRoles([...roles].concat(newRole));
		}
		setRoleName('');
	}


	const removeRole = (remove: string) => {
		setRoles(roles.filter(x => x.roleName != remove));
	}

	const showRoles = roles.map(x => <button onClick={() => removeRole(x.roleName)}>({x.roleQuant}) {x.roleName}</button>);

	return (
		<>
			<div className="flex flex-col">
				<p>{team.teamName}</p>
				{showRoles}
				<input onChange={updateRoleName} value={roleName}/>
				<button onClick={addRole}>Add Role</button>
			</div>

		</>
	);
}

export default TeamCard;
