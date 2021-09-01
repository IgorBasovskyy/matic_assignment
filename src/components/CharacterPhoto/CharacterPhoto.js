import React, { useContext } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import placeholder from '../../assets/images/placeholder.jpg';
import { CharactersContext } from '../../context/Characters';
import classes from './index.module.scss';

const CharacterPhoto = () => {
  const { searchedData, loading } = useContext(CharactersContext);

  return (
    <div className={classes.Character_Photo_Wrapper}>
      <img 
        className={classes.Character_Photo}
        src={searchedData.image || placeholder} 
        alt={searchedData.name || "placeholder"} 
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