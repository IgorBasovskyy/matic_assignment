import React, { useContext }  from 'react';
import CharacterInfoItem from '../CharacterInfoItem/CharacterInfoItem';
import { CharactersContext } from '../../context/Characters';

const CharacterInfo = () => {
  const { activeCharacter } = useContext(CharactersContext);
  const { name, species, type, location, origin, status } = activeCharacter;

  return (
    <div>
      <h2>{name}</h2>
      <CharacterInfoItem 
        label="Species"
        value={species}
      />
      <CharacterInfoItem 
        label="Type"
        value={type}
      />
      <CharacterInfoItem 
        label="Location"
        value={location.name}
      />
      <CharacterInfoItem 
        label="Origin"
        value={origin.name}
      />
      <CharacterInfoItem 
        label="Status"
        value={status}
      />
    </div>
  )
}

export default CharacterInfo;