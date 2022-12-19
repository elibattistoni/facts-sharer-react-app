import { useState } from "react";
import { CATEGORIES } from "../data";
import supabase from "../supabase";
import styles from "./Fact.module.css";

const Fact = ({ fact, onUpdateVotes }) => {
  // state of the buttons in order to disable buttons to prevent multiple clicks
  const [isUpdatingInteresting, setIsUpdatingInteresting] = useState(false);
  const [isUpdatingMindblowing, setIsUpdatingMindblowing] = useState(false);
  const [isUpdatingFalse, setIsUpdatingFalse] = useState(false);

  // find corresponding color
  fact.color = CATEGORIES.find(
    (category) => category.name === fact.category
  ).color;

  const addVoteHandler = (voteType) => {
    if (voteType === "votesInteresting") setIsUpdatingInteresting(true);
    if (voteType === "votesMindblowing") setIsUpdatingMindblowing(true);
    if (voteType === "votesFalse") setIsUpdatingFalse(true);

    const updateFact = async (voteType) => {
      let { data: updatedFact, error } = await supabase
        .from("facts")
        .update({ [`${voteType}`]: fact[`${voteType}`] + 1 })
        .eq("id", fact.id)
        .select();

      [updatedFact] = updatedFact;

      // Update votes
      if (!error) onUpdateVotes(updatedFact);

      if (voteType === "votesInteresting") setIsUpdatingInteresting(false);
      if (voteType === "votesMindblowing") setIsUpdatingMindblowing(false);
      if (voteType === "votesFalse") setIsUpdatingFalse(false);
    };
    updateFact(voteType);
  };

  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  return (
    <li className={styles.fact}>
      <p>
        {isDisputed && <span className={styles.disputed}>[⛔️ DISPUTED]</span>}
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
        <button
          onClick={() => addVoteHandler("votesInteresting")}
          disabled={isUpdatingInteresting}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => addVoteHandler("votesMindblowing")}
          disabled={isUpdatingMindblowing}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button
          onClick={() => addVoteHandler("votesFalse")}
          disabled={isUpdatingFalse}
        >
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
};

export default Fact;
