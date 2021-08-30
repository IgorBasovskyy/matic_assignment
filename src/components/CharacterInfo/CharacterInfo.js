import CharacterInfoItem from '../CharacterInfoItem/CharacterInfoItem';

const CharacterInfo = ({ searchedData }) => {
  const { name, species, type, location, origin, status } = searchedData;

  const setColor = status => {
    let className;

    switch (status) {
      case 'dead':
        className = "dead"
        break;
      case 'alive':
        className = "alive"
        break;
      case 'unknown':
        className = "unknown_info"
        break;
      default:
    }

    return className;
  }

  return (
    <div className="character_info_wrapper">
      <h2>{name}</h2>
      <CharacterInfoItem 
        label="Species"
        value={species}
        styles={species.name ? "known_info" : "unknown_info"}
      />
      <CharacterInfoItem 
        label="Type"
        value={type}
        styles={type.name ? "known_info" : "unknown_info"}
      />
      <CharacterInfoItem 
        label="Location"
        value={location.name}
        styles={location.name ? "known_info" : "unknown_info"}
      />
      <CharacterInfoItem 
        label="Origin"
        value={origin.name}
        styles={origin.name ? "known_info" : "unknown_info"}
      />
      <CharacterInfoItem 
        label="Status"
        value={status.charAt(0).toUpperCase() + status.slice(1)}
        styles={setColor(status)}
      />
    </div>
  )
}

export default CharacterInfo;