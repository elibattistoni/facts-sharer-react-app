import { CATEGORIES } from "../data";
import styles from "./Fact.module.css";

const Fact = ({ fact }) => {
  // find corresponding color
  fact.color = CATEGORIES.find(
    (category) => category.name === fact.category
  ).color;

  return (
    <li className={styles.fact}>
      <p>
        {fact.text}
        <a className={styles.source} href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className={styles.tag}
        style={{
          backgroundColor: `${fact.color}`,
        }}
      >
        {fact.category}
      </span>
      <div className={styles["vote-buttons"]}>
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔️ {fact.votesFalse}</button>
      </div>
    </li>
  );
};

export default Fact;
