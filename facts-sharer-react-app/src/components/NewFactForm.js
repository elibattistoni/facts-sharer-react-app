import { useEffect, useState } from "react";
import { CATEGORIES } from "../data";
import styles from "./NewFactForm.module.css";

const NewFactForm = (props) => {
  const [enteredText, setEnteredText] = useState("");
  const [enteredSource, setEnteredSource] = useState("");
  const [remainingChars, setRemainingChars] = useState(200);
  const [enteredCategory, setEnteredCategory] = useState("default");
  const [formIsValid, setFormIsValid] = useState(false);

  // handler functions for text and source
  const textChangeHandler = (e) => {
    setEnteredText(e.target.value);
    setRemainingChars(200 - e.target.value.length);
  };
  const sourceChangeHandler = (e) => setEnteredSource(e.target.value);
  const categoryChangeHandler = (e) => setEnteredCategory(e.target.value);

  // use the useEffect Hook to evaluate whether form is valid
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("check form validity");
      setFormIsValid(
        enteredText.trim().length > 5 && enteredSource.includes("https://")
      );
      // TODO add category validation
    }, 500);
    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [enteredText, enteredSource, enteredCategory]);

  // handler function for form submission
  const submitHandler = (e) => {
    e.preventDefault();
    // TODO
    console.log("FORM SUBMITTED!!");
    console.log(e);
    setEnteredText("");
    setEnteredSource("");
    setEnteredCategory("default");
    setRemainingChars(200);
  };

  return (
    <form className={styles["fact-form"]} onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Share a fact..."
        value={enteredText}
        onChange={textChangeHandler}
      />
      <span>{remainingChars}</span>
      <input
        type="text"
        placeholder="Source..."
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
      <button className="btn btn-large" type="submit" disabled={!formIsValid}>
        Post
      </button>
    </form>
  );
};

export default NewFactForm;
