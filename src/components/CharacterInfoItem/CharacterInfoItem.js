import classes from './index.module.scss';

const CharacterInfoItem = ({ label, value, styles }) => {
  return (
    <div className={classes.Character_Info_Item_Wrapper}>
      <div className={classes.Character_Info_Entity}>
        {label}
      </div>
      <div className={`${classes.Character_Info_Item} ${styles}`}>
        {value || "Unknown"}
      </div>
    </div>
  )
}

export default CharacterInfoItem;