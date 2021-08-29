import FadeLoader from "react-spinners/FadeLoader";
import placeholder from '../../assets/images/placeholder.jpg';

const CharacterPhoto = ({ searchedData, loading }) => {
  return (
    <div className="character_photo_wrapper">
      <img 
        src={searchedData.image || placeholder} 
        alt={searchedData.name || "placeholder"} 
      />
      <div className="loader_wrapper">
        <FadeLoader color="#000" loading={loading} />
      </div>
    </div>
  )
}

export default CharacterPhoto;