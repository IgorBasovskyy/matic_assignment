import classes from './index.module.scss';

const CharacterInfoItem = ({ label, value }) => {
  const setInfoTypeColor = type => {
    // ckecking type of character property to set required className
    let className;

    switch (type) {
      case 'Dead':
        className = "dead"
        break;
      case 'Alive':
        className = "alive"
        break;
      case 'Unknown':
      case "":
      case 'unknown':
        className = "unknown_info"
        break;
      default:
        className = "known_info"
    }

    return className;
  }

  const setFirstLeeterUpperCase = value => {
    // making the first letter of character property upperCase
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return (
    <div className={classes.Character_Info_Item_Wrapper}>
      <div className={classes.Character_Info_Entity}>
        {label}
      </div>
      <div className={`${classes.Character_Info_Item} ${setInfoTypeColor(value)}`}>
        {setFirstLeeterUpperCase(value) || "Unknown"}
      </div>
    </div>
  )
}

export default CharacterInfoItem;