import Fact from "./Fact";

const FactsList = ({ facts }) => {
  const factsList = (
    <ul className="facts-list">
      {facts.map((fact) => (
        <Fact fact={fact} key={fact.id} />
      ))}
    </ul>
  );

  return <section>{factsList}</section>;
};

export default FactsList;
