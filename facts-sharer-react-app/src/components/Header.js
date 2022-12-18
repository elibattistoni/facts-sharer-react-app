import styles from "./Header.module.css";

const Header = (props) => {
  const classNameButton = `btn btn-large btn-open ${
    props.isOpen ? "btn--one-color btn-grey" : "btn--rainbow"
  }`;
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>Today I Learned</h1>
      </div>
      <button className={classNameButton} onClick={props.onToggleForm}>
        {props.isOpen ? "Close" : "Share a fact"}
      </button>
    </header>
  );
};

export default Header;
