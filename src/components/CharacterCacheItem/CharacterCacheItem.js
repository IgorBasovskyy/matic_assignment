import React from "react";

const CharacterCacheItem = ({ item, chooseCachedCharacterHandler, activeId }) => {
  const { image, name, id } = item;

  return (
    <div 
      className={`character_cache_item ${activeId === id ? "active" : ""}`}
      onClick={() => chooseCachedCharacterHandler(id)}
    >
      <img 
        src={image} 
        alt={name} 
      />
    </div>
  )
}

export default CharacterCacheItem;