const CharacterInfo = ({ searchedData }) => {
  const { name, species, type, location, origin, status } = searchedData;

  return (
    <div className="character_info_wrapper">
      <h2>{name}</h2>
      <div>
        Species: {species}
      </div>
      <div>
        Type: {type}
      </div>
      <div>
        Location: {location.name}
      </div>
      <div>
        Origin: {origin.name}
      </div>
      <div>
        Status: {status}
      </div>
    </div>
  )
}

export default CharacterInfo;