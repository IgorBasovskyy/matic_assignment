import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Search from '../Search/Search';
import CharacterPhoto from '../CharacterPhoto/CharacterPhoto';
import CharacterInfo from '../CharacterInfo/CharacterInfo';
import CharacterCacheList from '../CharacterCacheList/CharacterCacheList';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [searchedData, setSearchedData] = useState({});
  const [notFound, setNotFound] = useState(false);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col lg={3}>
            <Search 
              setLoading={setLoading}
              setSearchedData={setSearchedData}
              setNotFound={setNotFound}
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
            <CharacterCacheList 
            
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
