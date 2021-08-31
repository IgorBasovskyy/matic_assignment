import React, { useEffect, useState } from 'react';
import CharacterCacheItem from '../CharacterCacheItem/CharacterCacheItem';

const CharacterCacheList = ({ cachedData, setCachedData, setSearchedData, setNotFound, currentInputValue }) => {
  const [activeId, setActiveId] = useState(null);

  const setCachedCharacter = id => {
    setSearchedData(...cachedData.filter(item => item.id === id));
  }

  useEffect(() => {
    setActiveId(null);

    if (currentInputValue) {
      cachedData.forEach(item => {
        if (item.id === currentInputValue) {
          setActiveId(item.id);
          setCachedCharacter(currentInputValue);
        } else {
          setActiveId(currentInputValue);
        }
      })
    }
  }, [currentInputValue])
  
  const clearAllHandler = () => {
    localStorage.clear();
    setCachedData([]);
    if (activeId) setSearchedData({});
  }

  const deleteCacheCharacater = (event, id) => {
    event.stopPropagation();
    const characters = JSON.parse(localStorage.getItem("characters")).filter(item => item.id !== id);
    localStorage.setItem("characters", JSON.stringify([...characters]));
    if (id === activeId) setSearchedData({});
    setCachedData(characters)
  }

  const chooseCachedCharacterHandler = id => {
    setActiveId(id);
    setNotFound(false);
    setCachedCharacter(id)
  }

  return (
    <>
      <button 
        className="action_btn"
        onClick={clearAllHandler}
      >
        Clear All
      </button>
      <div className="character_cache_list">
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