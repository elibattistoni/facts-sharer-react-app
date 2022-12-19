import Fact from "./Fact";

const FactsList = ({ facts, onUpdateVotes }) => {
  if (facts.length === 0)
    return (
      <p className="message">
        No facts for this category yet! Create the first one ✌️
      </p>
    );

  const factsList = (
    <ul className="facts-list">
      {facts.map((fact) => (
        <Fact fact={fact} key={fact.id} onUpdateVotes={onUpdateVotes} />
      ))}
    </ul>
  );

  return <section>{factsList}</section>;
};

export default FactsList;
