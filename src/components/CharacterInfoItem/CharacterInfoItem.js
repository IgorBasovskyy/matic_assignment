const CharacterInfoItem = ({ label, value, styles }) => {
  return (
    <div className="character_info_item_wrapper">
      <div className="character_info_item">
        {label}
      </div>
      <div className={styles}>
        {value || "Unknown"}
      </div>
    </div>
  )
}

export default CharacterInfoItem;