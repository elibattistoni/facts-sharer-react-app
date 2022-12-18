import styles from "./CategoryFilterItem.module.css";

const CategoryFilterItem = ({ category }) => {
  let classNameButton;
  if (category.id === 0) {
    classNameButton = `btn btn--rainbow ${styles["btn-all-categories"]}`;
  } else {
    classNameButton = `btn btn--one-color ${styles["btn-category"]}`;
  }
  return (
    <li className="category">
      <button
        className={classNameButton}
        style={{ backgroundColor: `${category.color}` }}
      >
        {category.name}
      </button>
    </li>
  );
};

export default CategoryFilterItem;
