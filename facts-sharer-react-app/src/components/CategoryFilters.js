import { CATEGORIES } from "../data";
import CategoryFilterItem from "./CategoryFilterItem";

const CategoryFilter = ({ onFilter }) => {
  const clickFilterHandler = (cat) => {
    onFilter(cat);
  };

  const categoriesList = (
    <ul>
      {CATEGORIES.map((category) => (
        <CategoryFilterItem
          category={category}
          key={category.id}
          onClickFilter={clickFilterHandler}
        />
      ))}
    </ul>
  );
  return <aside>{categoriesList}</aside>;
};

export default CategoryFilter;
