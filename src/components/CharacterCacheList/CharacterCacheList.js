import React, { useEffect, useState, useContext } from 'react';

import CharacterCacheItem from '../CharacterCacheItem/CharacterCacheItem';
import { CharactersContext } from '../../context/Characters';
import classes from './index.module.scss';

const CharacterCacheList = () => {
  const { setNotFound, currentInputValue, setCurrentInputValue, setActiveCharacter, characters, setCharacters } = useContext(CharactersContext);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    // setting a character active if it in the cache and user tap equal id with the cached character
    // otherwise set active a character that must be fetched from the api
    const character = characters.find(item => item.id === currentInputValue);
    
    if (character) {
      setActiveId(character.id);
      setActiveCharacter(character);
    } else {
      setActiveId(currentInputValue);
      setActiveCharacter({});
    }
  }, [currentInputValue])
  
  const clearAllHandler = () => {
    localStorage.clear(); // clear all cached data from localStorage
    setActiveCharacter({}); // clear character information if it on the screen
    setCharacters([]);
    setCurrentInputValue("");
  }

  const deleteCacheCharacater = (event, id) => {
    // delete certain character
    event.stopPropagation();
    const charactersList = characters.filter(item => item.id !== id);
    setCharacters(charactersList);
    setActiveCharacter({});
    setCurrentInputValue("");
  }

  const chooseCachedCharacterHandler = id => {
    // making character active
    setNotFound(false);
    setActiveCharacter(characters.find(item => item.id === id));
    setActiveId(id);
    setCurrentInputValue(id);
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
        {characters.map(item => {
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