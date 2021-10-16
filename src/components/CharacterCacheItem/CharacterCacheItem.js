import React from "react";
import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import classes from './index.module.scss';

const CharacterCacheItem = ({ item, chooseCachedCharacterHandler, activeId, deleteCacheCharacater }) => {
  const { image, name, id } = item;

  return (
    <button 
      className={`${classes.Character_Cache_Item} ${activeId === id ? classes.Active : ""}`}
      onClick={() => chooseCachedCharacterHandler(id)}
    >
      <img 
        src={image} 
        alt={name} 
      />
      <div 
        className={classes.Close_Button}
        onClick={(event) => deleteCacheCharacater(event, id)}
      >
        <CloseIcon />
      </div>
    </button>
  )
}

export default CharacterCacheItem;