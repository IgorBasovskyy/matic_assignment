import CharacterCacheItem from '../CharacterCacheItem/CharacterCacheItem';

const CharacterCacheList = ({ cachedData, setCachedData }) => {
  const clearAllHandler = () => {
    localStorage.clear();
    setCachedData([]);
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
            />
          )
        })}
      </div>  
    </>
  )
}

export default CharacterCacheList;