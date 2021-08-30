const CharacterInfoItem = ({ label, value, styles }) => {
  return (
    <div className="character_info_item_wrapper">
      <div className="character_info_entity">
        {label}
      </div>
      <div className={`character_info_item ${styles}`}>
        {value || "Unknown"}
      </div>
    </div>
  )
}

export default CharacterInfoItem;