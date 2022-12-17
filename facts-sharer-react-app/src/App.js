import { Fragment } from "react";
import CategoryFilter from "./components/CategoryFilters";
import FactsList from "./components/FactsList";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import "./style.css";

const App = () => {
  return (
    <Fragment>
      <Header />
      <NewFactForm />

      <main className="main">
        <CategoryFilter />
        <FactsList />
      </main>
    </Fragment>
  );
};

export default App;
