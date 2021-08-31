import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';

const Search = ({ setLoading, setSearchedData, setNotFound, cachedData, setCurrentInputValue }) => {
  const [submitting, setSubmitting] = useState(false)
  const { handleSubmit, control } = useForm();

  const setCache = apiData => {
    localStorage.setItem("characters", JSON.stringify([...cachedData, apiData]));
  }
  
  const onChangeHandler = event => {
    const value = +event.target.value;
    setCurrentInputValue(value);
  }

  const onSearchHandler = async (data, event) => {
    event.preventDefault();

    const id = +data.id;
    const cachedCharacter = JSON.parse(localStorage.getItem("characters"))?.filter(item => item.id === id);

    if (cachedCharacter?.length) {
      setSearchedData(...cachedCharacter);
    } else {
      setLoading(true)
      setSubmitting(true);

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

      setLoading(false)
      setSubmitting(false);
    }
  }

  return (
    <div className="search_wrapper">
      <form onSubmit={handleSubmit(onSearchHandler)}>
        <Controller
          render={({ field: { value = "", onChange } }) => (
            <input  
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