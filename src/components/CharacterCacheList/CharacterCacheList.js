import React, { useEffect, useState, useContext } from 'react';
import CharacterCacheItem from '../CharacterCacheItem/CharacterCacheItem';
import { CharactersContext } from '../../context/Characters';
import classes from './index.module.scss';

const CharacterCacheList = () => {
  const { cachedData, setCachedData, setSearchedData, setNotFound, currentInputValue } = useContext(CharactersContext);
  const [activeId, setActiveId] = useState(null);

  const setCachedCharacter = id => {
    setSearchedData(...cachedData.filter(item => item.id === id))
  };

  useEffect(() => {
    setActiveId(null);
    // setting a character active if it in the cache and user tap equal id with the cached character
    // otherwise set active a character that must be fetched from the api
    if (currentInputValue) {
      cachedData.forEach(item => {
        if (item.id === currentInputValue) {
          setActiveId(item.id);
          setCachedCharacter(item.id);
        } else {
          setActiveId(currentInputValue);
        }
      })
    } else {
      setSearchedData({});
    }
  }, [currentInputValue])
  
  const clearAllHandler = () => {
    localStorage.clear(); // clear all cached data from localStorage
    setCachedData([]); // clear cached characters from ui
    if (activeId) setSearchedData({}); // clear character information if it on the screen
  }

  const deleteCacheCharacater = (event, id) => {
    // delete certain character
    event.stopPropagation();
    const characters = JSON.parse(localStorage.getItem("characters"))
      .filter(item => item.id !== id);

    localStorage.setItem("characters", JSON.stringify([...characters]));

    if (id === activeId) setSearchedData({});
    setCachedData(characters)
  }

  const chooseCachedCharacterHandler = id => {
    // making character active
    setActiveId(id);
    setNotFound(false);
    setCachedCharacter(id);
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