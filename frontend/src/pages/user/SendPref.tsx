import { useState } from "react";
import { useParams } from "react-router-dom";

// dummy data
const rolesList = ['Sword', 'Lance', 'Axe', 'shield', 'halberd', 'cleaver', 'saw'];
const totalChoices = 3;

// cbs to do this in a non clown way LMAO
const SendPref = () => {
	const {eventName, userName} = useParams();
	const [prefs, setPrefs] = useState<string[]>([]);

	const handleRole = (newRole: string) => {
		prefs.includes(newRole) 
			? setPrefs([...prefs].filter(x => x != newRole))
			: setPrefs([...prefs].concat(newRole));
	}

	const showRoles = () => rolesList.map(x =><button onClick={() => handleRole(x)}>{x}</button>);
	const showPrefs = () => prefs.map(x => <button onClick={() => setPrefs([...prefs].filter(item => item != x))}>{x}</button>);
	
	return (
		<div className="flex flex-col border-2 border-black w-full h-screen">
			<p className="m-8 leading-2 text-3xl font-bold text-theme-cream">{eventName}</p>
			<p>Hiya {userName}, let us know your preferences to help us better assign a role to you!</p>

			<div className="grid grid-cols-5 gap-4 border-2 border-black w-full h-full">
				
				<div className="col-span-3 p-5">
					<p className="text-theme-cream font-semibold text-l m-3">Click in order from most preferred to least preferred</p>
					<div className="grid grid-cols-3 gap-4 items-start p-3 h-5/6 bg-white/30">
						{showRoles()}
					</div>
				</div>

				<div className="col-span-2 p-5">
					<p className="text-theme-cream font-semibold text-l m-3">Your preferences ({prefs.length}/{totalChoices})</p>
					<div className="flex flex-col p-3 overflow-x-scroll h-4/6 bg-white/30">
						{showPrefs()}
					</div>
					<button>Submit</button>
				</div>

			</div>
		</div>
	);
}

export default SendPref;