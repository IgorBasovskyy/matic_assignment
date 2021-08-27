import FadeLoader from "react-spinners/FadeLoader";

const CharacterPhoto = ({ image, loading }) => {

  return (
    <div className="character_photo_wrapper">
      <img src={image.src} alt={image.alt} />
      <div className="loader_wrapper">
        <FadeLoader color="#000" loading={loading} />
      </div>
    </div>
  )
}

export default CharacterPhoto;