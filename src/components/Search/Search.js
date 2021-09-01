import React, { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { CharactersContext } from '../../context/Characters';
import classes from './index.module.scss';

const Search = () => {
  const { setLoading, setSearchedData, setNotFound, cachedData, setCurrentInputValue } = useContext(CharactersContext);
  const [submitting, setSubmitting] = useState(false); // state for disable input and search button when request is pending
  const { handleSubmit, control } = useForm(); // hook from react-hook-from library to manage the forms

  const setCache = apiData => {
    // setting fetched caharacter to the localStorage with fetched date
    let apiDateDuplicate = { ...apiData };
    apiDateDuplicate.fetched_date = Date.now();
    localStorage.setItem("characters", JSON.stringify([...cachedData, apiDateDuplicate]));
  }
  
  const onChangeHandler = event => {
    // getting input value
    const value = +event.target.value;
    setCurrentInputValue(value);
  }

  const characterRequest = async id => {
    await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
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
    setLoading(false);
    setSubmitting(false);
  }

  const onSearchHandler = (data, event) => {
    event.preventDefault();

    const id = +data.id;
    const cachedCharacter = JSON.parse(localStorage.getItem("characters"))
      ?.filter(item => item.id === id); //check the current character with characters from the localStorage if so then we do not make a request

    if (cachedCharacter?.length) {
      setSearchedData(...cachedCharacter);
    } else {
      setLoading(true)
      setSubmitting(true);
      characterRequest(id); // request
    }
  }

  return (
    <div className={classes.Search_Wrapper}>
      <form onSubmit={handleSubmit(onSearchHandler)}>
        <Controller
          render={({ field: { value = "", onChange } }) => (
            <input  
              className={classes.Search_Input}
              onChange={(e) => {
                onChange((e.target.value))
                onChangeHandler(e)
              }}
              placeholder="Enter any number" 
              type="number" 
              disabled={submitting}
              value={value}
            />
          )}
          name="id"
          control={control}
          rules={{ required: true }}
        />
        <button
          className="action_btn"
          type="submit"
          disabled={submitting}
        >
          Search
        </button>
      </form>
    </div>
  )
}

export default Search;