import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = '62e70664';
  const APP_KEY = '3fda0f3b4d2c507fc450de4af88db4e0';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('microgreen');

  useEffect(() => {
    GET_RECEPIES();
  }, [query]);

  const GET_RECEPIES = async () => {
    const RESPONSE = await fetch(`https://api.edamam.com/search?q=microgreen&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const DATA = await RESPONSE.json();
    setRecipes(DATA.hits);
    console.log(DATA.hits);
  };

  const UPDATE_SEARCH = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }
  return(
    <div className="App">
      <h1>Hello react microgreen recipes</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={UPDATE_SEARCH} />
          <button className="search-button" type="submit">
            Search
          </button>
      </form>
      {recipes.map(recipe => (
        <Recipe 
                key={recipe.recipe.label}
                title={recipe.recipe.label} 
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}>

                </Recipe>
      ))}
    </div>
    );
};


export default App;
