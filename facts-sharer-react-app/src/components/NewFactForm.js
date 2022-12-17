import { CATEGORIES } from "../data";
import styles from "./NewFactForm.module.css";

const NewFactForm = (props) => {
  return (
    <form className={styles["fact-form"]} onSubmit={() => {}}>
      <input type="text" placeholder="Share a fact with the world..." />
      <span>200</span>
      <input type="text" placeholder="Trustworthy source..." />
      <select>
        <option value="">Choose category:</option>
        {CATEGORIES.filter((cat) => cat.id > 0).map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" onClick={() => {}}>
        Post
      </button>
    </form>
  );
};

export default NewFactForm;
