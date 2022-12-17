import styles from "./CategoryFilterItem.module.css";

const CategoryFilterItem = ({ category }) => {
  return (
    <li className="category">
      <button
        className={`btn ${
          category.id === 0
            ? styles["btn-all-categories"]
            : styles["btn-category"]
        }`}
        style={{ backgroundColor: `${category.color}` }}
      >
        {category.name}
      </button>
    </li>
  );
};

export default CategoryFilterItem;
