import { Fragment, useEffect, useState } from "react";
import CategoryFilter from "./components/CategoryFilters";
import FactsList from "./components/FactsList";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import Spinner from "./components/Spinner";
import supabase from "./supabase";
import "./style.css";

const App = () => {
  //# STATES OF THE APP COMPONENT
  // state of the facts
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  //# RETRIEVE DATA FROM DB
  // get facts list from database
  useEffect(() => {
    setIsLoading(true);

    // create query
    let query = supabase.from("facts").select("*");
    if (currentCategory != "all") query.eq("category", currentCategory);

    const getFactsFromDb = async () => {
      let { data: factsOnDb, error } = await query
        .order("votesInteresting", { ascending: false })
        .limit(1000);

      if (!error) setFacts(factsOnDb);
      else alert("There was a problem getting data");

      setIsLoading(false);
    };
    getFactsFromDb();
  }, [currentCategory]);

  //# FILTER HANDLER
  const handlerFilter = (selectedCategory) => {
    console.log(selectedCategory); //TODO REMOVE
    setCurrentCategory(selectedCategory);
  };

  //# FORM HANDLER
  // state of the form
  const [formIsVisible, setFormIsVisible] = useState(false);
  // change state of the form if the button in the header was clicked
  const toggleStateForm = () => {
    setFormIsVisible((currentState) => !currentState);
  };

  //# ADD NEW FACT HANDLER
  const addFactHandler = (newFact) => {
    setFacts((currentFacts) => [newFact, ...currentFacts]);
  };

  return (
    <Fragment>
      <Header onToggleForm={toggleStateForm} isOpen={formIsVisible} />
      {formIsVisible && <NewFactForm onAddNewFact={addFactHandler} />}
      <main className="main">
        <CategoryFilter onFilter={handlerFilter} />
        {isLoading && <Spinner />}
        {!isLoading && facts && <FactsList facts={facts} />}
      </main>
    </Fragment>
  );
};

export default App;
