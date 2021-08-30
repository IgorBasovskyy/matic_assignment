import CharacterInfoItem from '../CharacterInfoItem/CharacterInfoItem';

const CharacterInfo = ({ searchedData }) => {
  const { name, species, type, location, origin, status } = searchedData;

  const setInfoTypeColor = type => {
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
    return value.charAt(0).toUpperCase() + value.slice(1)
  }

  return (
    <div className="character_info_wrapper">
      <h2>{name}</h2>
      <CharacterInfoItem 
        label="Species"
        value={setFirstLeeterUpperCase(species)}
        styles={setInfoTypeColor(species)}
      />
      <CharacterInfoItem 
        label="Type"
        value={setFirstLeeterUpperCase(type)}
        styles={setInfoTypeColor(type)}
      />
      <CharacterInfoItem 
        label="Location"
        value={setFirstLeeterUpperCase(location.name)}
        styles={setInfoTypeColor(location.name)}
      />
      <CharacterInfoItem 
        label="Origin"
        value={setFirstLeeterUpperCase(origin.name)}
        styles={setInfoTypeColor(origin.name)}
      />
      <CharacterInfoItem 
        label="Status"
        value={setFirstLeeterUpperCase(status)}
        styles={setInfoTypeColor(status)}
      />
    </div>
  )
}

export default CharacterInfo;