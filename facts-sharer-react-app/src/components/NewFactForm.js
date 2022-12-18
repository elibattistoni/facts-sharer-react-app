import { useEffect, useState } from "react";
import { CATEGORIES } from "../data";
import styles from "./NewFactForm.module.css";

const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

const NewFactForm = (props) => {
  const [enteredText, setEnteredText] = useState("");
  const [enteredSource, setEnteredSource] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("default");
  const [formIsValid, setFormIsValid] = useState(false);
  const numChars = enteredText.length;

  // handler functions for text and source
  const textChangeHandler = (e) => {
    setEnteredText(e.target.value);
  };
  const sourceChangeHandler = (e) => setEnteredSource(e.target.value);
  const categoryChangeHandler = (e) => setEnteredCategory(e.target.value);

  // use the useEffect Hook to evaluate whether form is valid
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredText.trim().length > 6 &&
          isValidHttpUrl(enteredSource) &&
          CATEGORIES.some(
            (cat) => cat.name.toLowerCase() === enteredCategory.toLowerCase()
          )
      );
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [enteredText, enteredSource, enteredCategory]);

  let classNameButton = "btn btn-large";
  if (formIsValid) {
    classNameButton = `${classNameButton} btn--rainbow`;
  } else {
    classNameButton = `${classNameButton} btn--one-color btn-grey`;
  }

  // handler function for form submission
  const submitHandler = (e) => {
    // PREVENT DEFAULT
    e.preventDefault();

    // CREATE A NEW FACT (FORM IS VALID AUTOMATICALLY, OTHERWISE THE USER COULD NOT HAVE SUBMITTED)
    const newFact = {
      id: Math.round(Math.random() * 10000),
      text: enteredText,
      source: enteredSource,
      category: enteredCategory,
      votesInteresting: 0,
      votesMindblowing: 0,
      votesFalse: 0,
      createdIn: new Date().getFullYear(),
    };

    props.onAddNewFact(newFact);

    // RESET FORM
    setEnteredText("");
    setEnteredSource("");
    setEnteredCategory("default");
  };

  return (
    <form className={styles["fact-form"]} onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Share a fact..."
        value={enteredText}
        onChange={textChangeHandler}
        maxLength={200}
      />
      <span>{200 - numChars}</span>
      <input
        type="text"
        placeholder="Source (URL)..."
        value={enteredSource}
        onChange={sourceChangeHandler}
      />
      <select value={enteredCategory} onChange={categoryChangeHandler}>
        <option value="default">Category:</option>
        {CATEGORIES.filter((cat) => cat.id > 0).map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className={classNameButton} type="submit" disabled={!formIsValid}>
        Post
      </button>
    </form>
  );
};

export default NewFactForm;
