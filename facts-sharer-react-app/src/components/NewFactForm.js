import styles from "./NewFactForm.module.css";

const NewFactForm = (props) => {
  const stateForm = !props.isFormVisible ? "hidden" : "";
  return (
    <form className={`${styles["fact-form"]} ${stateForm}`} onSubmit={() => {}}>
      <input type="text" placeholder="Share a fact with the world..." />
      <span>200</span>
      <input type="text" placeholder="Trustworthy source..." />
      <select>
        <option value="">Choose category:</option>
        <option value="technology">Technology</option>
        <option value="science">Science</option>
        <option value="finance">Finance</option>
      </select>
      <button className="btn btn-large" onClick={() => {}}>
        Post
      </button>
    </form>
  );
};

export default NewFactForm;
