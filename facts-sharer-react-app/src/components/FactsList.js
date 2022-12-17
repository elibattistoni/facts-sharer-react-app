import { initialFacts } from "../data";
import Fact from "./Fact";

const FactsList = () => {
  const facts = (
    <ul className="facts-list">
      {initialFacts.map((fact) => (
        <Fact fact={fact} key={fact.id} />
      ))}
    </ul>
  );

  return <section>{facts}</section>;
};

export default FactsList;
