import React from "react";
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

const CharacterCacheItem = ({ item, chooseCachedCharacterHandler, activeId, deleteCacheCharacater }) => {
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
      <div 
        className="close_button"
        onClick={(event) => deleteCacheCharacater(event, id)}
      >
        <CloseIcon />
      </div>
    </div>
  )
}

export default CharacterCacheItem;