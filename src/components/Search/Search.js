import React, { useContext } from "react";
import axios from 'axios';
import { CharactersContext } from '../../context/Characters';
import classes from './index.module.scss';

const Search = () => {
  const { setLoading, setSearchedData, setNotFound, cachedData, setCurrentInputValue, currentInputValue, loading } = useContext(CharactersContext);

  const setCache = character => {
    // setting fetched caharacter to the localStorage with fetched date
    character.fetched_date = Date.now();
    localStorage.setItem("characters", JSON.stringify([...cachedData, character]));
  }

  const characterRequest = id => {
    setLoading(true);

    axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      .then(response => {
        setSearchedData(response.data);
        setCache(response.data);
        setNotFound(false);
      })
      .catch(error => {
        console.log('error', error);
        setSearchedData({});
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const onSearchHandler = event => {
    event.preventDefault();

    const cachedCharacter = JSON.parse(localStorage.getItem("characters"))
      ?.find(item => item.id === currentInputValue); //check the current character with characters from the localStorage if so then we do not make a request

    if (cachedCharacter) {
      setSearchedData(cachedCharacter);
    } else {
      characterRequest(currentInputValue); // request
    }
  }

  const onChangeHandler = event => {
    const { value }  = event.target;

    setCurrentInputValue(+value);
  }

  return (
    <div className={classes.Search_Wrapper}>
      <form onSubmit={onSearchHandler}>
        <input  
          className={classes.Search_Input}
          placeholder="Enter any number" 
          type="number"
          onChange={onChangeHandler}
          name="id"
          required="required"
          disabled={loading}
          value={currentInputValue}
        />
        <button
          className="action_btn"
          type="submit"
          disabled={loading}
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default Search;