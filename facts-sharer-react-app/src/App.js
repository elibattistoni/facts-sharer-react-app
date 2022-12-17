import { Fragment, useState } from "react";
import CategoryFilter from "./components/CategoryFilters";
import FactsList from "./components/FactsList";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import "./style.css";

const App = () => {
  // state of the form
  const [formIsVisible, setFormIsVisible] = useState(false);
  // change state of the form if the button in the header was clicked
  const toggleStateForm = () => {
    setFormIsVisible((currentState) => !currentState);
  };

  return (
    <Fragment>
      <Header onToggleForm={toggleStateForm} />
      {formIsVisible && <NewFactForm />}
      <main className="main">
        <CategoryFilter />
        <FactsList />
      </main>
    </Fragment>
  );
};

export default App;
