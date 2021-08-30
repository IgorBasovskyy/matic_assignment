import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

const Search = ({ setLoading, setSearchedData, setNotFound, cachedData }) => {
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit } = useForm();

  const setCache = apiData => {
    localStorage.setItem("characters", JSON.stringify([...cachedData, apiData]));
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
        console.log('error');
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
        <input 
          type="number" 
          placeholder="Enter any number" 
          disabled={submitting}
          // onChange={onChangeHandler}
          {...register("id", { required: true })}
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