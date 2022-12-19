import { Fragment, useEffect, useState } from "react";
import CategoryFilter from "./components/CategoryFilters";
import FactsList from "./components/FactsList";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import Spinner from "./components/Spinner";
import supabase from "./supabase";
import "./style.css";

const App = () => {
  // state of the facts
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // get facts list from database
  useEffect(() => {
    setIsLoading(true);
    const getFactsFromDb = async () => {
      let { data: factsOnDb, error } = await supabase
        .from("facts")
        .select("*")
        .order("votesInteresting", { ascending: false })
        .limit(1000);

      if (!error) setFacts(factsOnDb);
      else alert("There was a problem getting data");

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
