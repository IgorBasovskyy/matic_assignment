import React, { useEffect, useState } from 'react';
import CharacterCacheItem from '../CharacterCacheItem/CharacterCacheItem';

const CharacterCacheList = ({ cachedData, setCachedData, searchedData, setSearchedData, setNotFound }) => {
  const [activeId, setActiveId] = useState(false);

  const clearAllHandler = () => {
    localStorage.clear();
    setCachedData([]);
  }

  useEffect(() => {
    setActiveId(null)

    cachedData.forEach(item => {
      if (item.id === searchedData.id) {
        setActiveId(item.id);
      }
    })
  }, [searchedData, cachedData])

  const chooseCachedCharacterHandler = id => {
    setActiveId(id);
    setNotFound(false);

    setSearchedData(...cachedData.filter(item => item.id === id));
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
              activeId={activeId}
            />
          )
        }).reverse()}
      </div>  
    </>
  )
}

export default CharacterCacheList;