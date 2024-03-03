import { useState } from "react";
import { useParams } from "react-router-dom";

// dummy data
const rolesList = ['Sword', 'Lance', 'Axe', 'shield', 'halberd', 'cleaver', 'saw'];
const totalChoices = 3;

// lmao
const SendPref = () => {
	const {eventName, userName} = useParams();
	const [prefs, setPrefs] = useState<string[]>([]);

	const handleRole = (newRole: string) => {
		prefs.includes(newRole) 
			? setPrefs([...prefs].filter(x => x != newRole))
			: setPrefs([...prefs].concat(newRole));
	}

	// lmao x2
	const showRoles = () => rolesList.map(x => prefs.includes(x)
		? <button className="bg-card-green p-3 rounded-xl hover:outline outline-offset-2 outline-card-green" onClick={() => handleRole(x)}>{x}</button>
		: <button className="bg-card-orange p-3 rounded-xl hover:outline outline-offset-2 outline-card-orange" disabled={prefs.length >= totalChoices} onClick={() => handleRole(x)}>{x}</button>);

	const showPrefs = () => prefs.map((x, i) => <button className="border-2 border-black rounded-xl my-2 p-3 hover:bg-black/10" onClick={() => setPrefs([...prefs].filter(item => item != x))}>{i + 1}. {x}</button>);
	
	return (
		<div className="flex flex-col w-full h-screen">
			<p className="ml-6 mt-8 leading-2 text-3xl font-bold text-theme-cream">{eventName}</p>
			<p className="ml-6 text-blue-300">Hiya {userName}, let us know your preferences to help us better assign a role to you!</p>

			<div className="grid grid-cols-5 gap-4 w-full h-full">
				
				<div className="col-span-3 p-5">
					<p className="text-theme-cream font-semibold text-l m-3">Click in order from most preferred to least preferred</p>
					<div className="bg-theme-cream/30 h-5/6 rounded-xl p-2 outline outline-white/30 outline-2 outline-offset-2">
						<div className="grid grid-cols-3 gap-4 items-start p-3 h-fit">
							{showRoles()}
						</div>
					</div>
				</div>

				<div className="col-span-2 p-5">
					<p className="text-theme-cream font-semibold text-l m-3">Your preferences ({prefs.length}/{totalChoices})</p>
					<div className="flex flex-col p-3 overflow-x-scroll h-4/6 bg-theme-cream/30 rounded-xl outline outline-white/30 outline-2 outline-offset-2">
						{showPrefs()}
					</div>
					<button className="p-3 bg-card-orange hover:bg-card-green w-full my-7 rounded-xl font-semibold">Submit</button>
				</div>

			</div>
		</div>
	);
}

export default SendPref;