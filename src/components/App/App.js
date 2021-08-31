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
    const characters = JSON.parse(localStorage.getItem("characters") || "[]");
    setCachedData(characters);
  }, [searchedData]);

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
