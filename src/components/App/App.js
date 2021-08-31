import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Search from '../Search/Search';
import CharacterPhoto from '../CharacterPhoto/CharacterPhoto';
import CharacterInfo from '../CharacterInfo/CharacterInfo';
import CharacterCacheList from '../CharacterCacheList/CharacterCacheList';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [searchedData, setSearchedData] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [cachedData, setCachedData] = useState([]);
  const [currentInputValue, setCurrentInputValue] = useState("");

  useEffect(() => {
    // Getting the characters from the localStorage or an empty array if localStorage is empty and set characters
    // to cache list for render.
    const characters = JSON.parse(localStorage.getItem("characters") || "[]");
    setCachedData(characters);
  }, [searchedData]);

  const postedCharacterCheck = () => {
    const characters = JSON.parse(localStorage.getItem("characters") || "[]");
    const updatedCharacters = characters.filter(item => {
      const currentDate = Date.now();
      if ((currentDate - item.fetched_date) < (2 * 60 * 60 * 1000)) return item;
    })
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));
  }

  useEffect(() => {
    // Getting the characters from the localStorage and check whether two hours have passed since the installation of 
    // the character in the localStorage. if so, delete the character from the array and set a new array to the localStorage.
    postedCharacterCheck();                      
  }, []);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col lg={3}>
            <Search 
              setLoading={setLoading}
              setSearchedData={setSearchedData}
              setNotFound={setNotFound}
              setCachedData={setCachedData}
              cachedData={cachedData}
              searchedData={searchedData}
              setCurrentInputValue={setCurrentInputValue}
            />
            <CharacterPhoto 
              loading={loading}
              searchedData={searchedData}
            />
          </Col>
          <Col lg={8}>
            {!!Object.keys(searchedData).length && (
              <CharacterInfo 
                searchedData={searchedData}
              />
            )}
            {notFound && <h2 className="not_found">Character not found</h2>}
          </Col>
          <Col lg={1}>
            {!!cachedData.length && (
              <div className="text-center">
                <CharacterCacheList 
                  setNotFound={setNotFound}
                  cachedData={cachedData}
                  setCachedData={setCachedData}
                  setSearchedData={setSearchedData}
                  currentInputValue={currentInputValue}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
