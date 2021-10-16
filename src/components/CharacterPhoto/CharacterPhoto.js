import React, { useContext } from "react";
import FadeLoader from "react-spinners/FadeLoader";

import { CharactersContext } from '../../context/Characters';
import placeholder from '../../assets/images/placeholder.jpg';
import classes from './index.module.scss';

const CharacterPhoto = () => {
  const { loading, activeCharacter } = useContext(CharactersContext);

  return (
    <div className={classes.Character_Photo_Wrapper}>
      <img 
        className={classes.Character_Photo}
        src={activeCharacter.image || placeholder} 
        alt={activeCharacter.name || "placeholder"} 
      />
      {loading && (
        <div className={classes.Spinner_Wrapper}>
          <FadeLoader color="#000" loading={true} />
        </div>
      )}
    </div>
  )
}

export default CharacterPhoto;