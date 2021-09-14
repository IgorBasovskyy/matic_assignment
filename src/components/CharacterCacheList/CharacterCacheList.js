import React, { useEffect, useState, useContext } from 'react';
import CharacterCacheItem from '../CharacterCacheItem/CharacterCacheItem';
import { CharactersContext } from '../../context/Characters';
import classes from './index.module.scss';

const CharacterCacheList = () => {
  const { cachedData, setCachedData, setSearchedData, setNotFound, currentInputValue, setCurrentInputValue } = useContext(CharactersContext);
  const [activeId, setActiveId] = useState(null);

  const setCachedCharacter = character => {
    setSearchedData(character)
  };

  useEffect(() => {
    // setting a character active if it in the cache and user tap equal id with the cached character
    // otherwise set active a character that must be fetched from the api
    const character = cachedData.find(item => item.id === currentInputValue);
    setActiveId(null);
    setSearchedData({});
  
    if (currentInputValue) setActiveId(currentInputValue);
    if (character) setCachedCharacter(character);
  }, [currentInputValue])
  
  const clearAllHandler = () => {
    localStorage.clear(); // clear all cached data from localStorage
    setCachedData([]); // clear cached characters from ui
    if (activeId) setSearchedData({}); // clear character information if it on the screen
    setCurrentInputValue("");
  }

  const deleteCacheCharacater = (event, id) => {
    // delete certain character
    event.stopPropagation();
    const characters = JSON.parse(localStorage.getItem("characters"))
      .filter(item => item.id !== id);

    localStorage.setItem("characters", JSON.stringify([...characters]));
    setCachedData(characters);
    setCurrentInputValue("");
  }

  const chooseCachedCharacterHandler = id => {
    // making character active
    setNotFound(false);
    setCurrentInputValue(id)
  }

  return (
    <>
      <button 
        className="action_btn"
        onClick={clearAllHandler}
      >
        Clear All
      </button>
      <div className={classes.Character_Cache_List}>
        {cachedData.map(item => {
          return (
            <CharacterCacheItem 
              key={item.id}
              item={item}
              chooseCachedCharacterHandler={chooseCachedCharacterHandler}
              deleteCacheCharacater={deleteCacheCharacater}
              activeId={activeId}
            />
          )
        }).reverse()}
      </div>  
    </>
  )
}

export default CharacterCacheList;