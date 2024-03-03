
const getNumberWithOrdinal = (n: number) => {
  var s = ["th", "st", "nd", "rd"],
      v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const PersonRow = ({person}) => {
    return (
        <div className="flex justify-between">
            <div>{person.name}</div>
            <div><b>{getNumberWithOrdinal(person.choice)}</b></div>
        </div>
    )
}

export default PersonRow;