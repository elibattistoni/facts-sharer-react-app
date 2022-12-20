import Fact from "./Fact";
import styles from "./FactsList.module.css";

const FactsList = ({ facts, onUpdateVotes }) => {
  if (facts.length === 0)
    return (
      <p className="message">
        No facts for this category yet! Create the first one ✌️
      </p>
    );

  const factsList = (
    <ul className={styles["facts-list"]}>
      {facts.map((fact) => (
        <Fact fact={fact} key={fact.id} onUpdateVotes={onUpdateVotes} />
      ))}
    </ul>
  );

  return (
    <section className="facts-list--container styled-scrollbars">
      {factsList}
    </section>
  );
};

export default FactsList;
