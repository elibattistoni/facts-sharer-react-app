import { Fragment, useState } from "react";
import CategoryFilter from "./components/CategoryFilters";
import FactsList from "./components/FactsList";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import { initialFacts } from "./data";
import "./style.css";

const App = () => {
  // state of the form
  const [formIsVisible, setFormIsVisible] = useState(false);
  // change state of the form if the button in the header was clicked
  const toggleStateForm = () => {
    setFormIsVisible((currentState) => !currentState);
  };

  // state of the facts
  const [facts, setFacts] = useState(initialFacts);
  const addFactHandler = (newFact) => {
    setFacts((currentFacts) => [newFact, ...currentFacts]);
  };

  return (
    <Fragment>
      <Header onToggleForm={toggleStateForm} isOpen={formIsVisible} />
      {formIsVisible && <NewFactForm onAddNewFact={addFactHandler} />}
      <main className="main">
        <CategoryFilter />
        <FactsList facts={facts} />
      </main>
    </Fragment>
  );
};

export default App;
