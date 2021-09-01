import React, { useContext }  from 'react';
import CharacterInfoItem from '../CharacterInfoItem/CharacterInfoItem';
import { CharactersContext } from '../../context/Characters';

const CharacterInfo = () => {
  const { searchedData } = useContext(CharactersContext);
  const { name, species, type, location, origin, status } = searchedData;

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
    <div>
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