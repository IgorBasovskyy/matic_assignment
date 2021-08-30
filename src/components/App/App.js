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

  useEffect(() => {
    let characters = {...localStorage };
    let arr = [];

    for(let key in characters) {
      arr.push(JSON.parse(characters[key]))
    }

    setCachedData(arr);
  }, [searchedData]);

  console.log(cachedData)

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
                  cachedData={cachedData}
                  setCachedData={setCachedData}
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
