import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>Today I Learned</h1>
      </div>
      <button className="btn btn-large btn-open" onClick={props.onToggleForm}>
        Share a fact
      </button>
    </header>
  );
};

export default Header;
