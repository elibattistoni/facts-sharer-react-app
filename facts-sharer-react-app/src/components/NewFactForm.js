import { useEffect, useState } from "react";
import { CATEGORIES } from "../data";
import supabase from "../supabase";
import styles from "./NewFactForm.module.css";
import Spinner from "./Spinner";

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
  const [isUploading, setIsUploading] = useState(false);
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
  if (formIsValid) classNameButton = `${classNameButton} btn--rainbow`;
  else classNameButton = `${classNameButton} btn--one-color btn-grey`;

  // handler function for form submission
  const submitHandler = (e) => {
    // PREVENT DEFAULT
    e.preventDefault();

    //=== change state of uploading
    setIsUploading(true);
    const postData = async (text, source, category) => {
      //=== make post request
      let { data: newFact, error } = await supabase
        .from("fact")
        .insert([{ text, source, category }])
        .select();

      if (error) {
        alert("There was a problem sumbitting data");
      } else {
        //=== extract with destructuring
        [newFact] = newFact;

        //=== add new fact to list of facts (state) so that the interface is reloaded without having to perform another get request
        props.onAddNewFact(newFact);
      }

      //=== change again state of uploading and of the form
      setFormIsValid(false); // so that the submit button will return immediately grey (otherwise it was showing first rainbow, then grey)
      setIsUploading(false); // remove spinner
    };
    postData(enteredText, enteredSource, enteredCategory);

    //=== RESET FORM
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
      {!isUploading && (
        <button
          className={classNameButton}
          type="submit"
          disabled={!formIsValid}
        >
          Post
        </button>
      )}
      {isUploading && <Spinner />}
    </form>
  );
};

export default NewFactForm;
