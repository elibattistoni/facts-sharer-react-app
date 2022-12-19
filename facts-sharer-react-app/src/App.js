import { Fragment, useEffect, useState } from "react";
import supabase from "./supabase";
import CategoryFilter from "./components/CategoryFilters";
import FactsList from "./components/FactsList";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import "./style.css";
import Spinner from "./components/Spinner";

const App = () => {
  // state of the facts
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // get facts list from database
  useEffect(() => {
    setIsLoading(true);
    const getFactsFromDb = async () => {
      let { data: factsOnDb } = await supabase.from("facts").select("*");
      setFacts(factsOnDb);
      setIsLoading(false);
    };
    getFactsFromDb();
  }, []);

  // state of the form
  const [formIsVisible, setFormIsVisible] = useState(false);
  // change state of the form if the button in the header was clicked
  const toggleStateForm = () => {
    setFormIsVisible((currentState) => !currentState);
  };

  const addFactHandler = (newFact) => {
    setFacts((currentFacts) => [newFact, ...currentFacts]);
  };

  return (
    <Fragment>
      <Header onToggleForm={toggleStateForm} isOpen={formIsVisible} />
      {formIsVisible && <NewFactForm onAddNewFact={addFactHandler} />}
      <main className="main">
        <CategoryFilter />
        {isLoading && <Spinner />}
        {!isLoading && <FactsList facts={facts} />}
      </main>
    </Fragment>
  );
};

export default App;
