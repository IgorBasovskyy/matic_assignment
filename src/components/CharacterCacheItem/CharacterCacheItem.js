const CharacterCacheItem = ({item}) => {
  return (
    <div className="character_cache_item">
      <img src={item.image} />
    </div>
  )
}

export default CharacterCacheItem;