import { CATEGORIES } from "../data";
import CategoryFilterItem from "./CategoryFilterItem";

const CategoryFilter = () => {
  const categoriesList = (
    <ul>
      {CATEGORIES.map((category) => (
        <CategoryFilterItem category={category} key={category.id} />
      ))}
    </ul>
  );
  return <aside>{categoriesList}</aside>;
};

export default CategoryFilter;
