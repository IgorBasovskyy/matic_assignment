import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Search from '../Search/Search';
import CharacterPhoto from '../CharacterPhoto/CharacterPhoto';
import CharacterInfo from '../CharacterInfo/CharacterInfo';
import CharacterCacheList from '../CharacterCacheList/CharacterCacheList';
import { CharactersContext } from '../../context/Characters';
import useLocalStorage from '../../customHooks/useLocalStorage';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [characters, setCharacters] = useLocalStorage();
  const [activeCharacter, setActiveCharacter] = useState({});
  
  useEffect(() => {
    // Getting the characters from the localStorage and check whether two hours have passed since the installation of 
    // the character in the localStorage. if so, delete the character from the array and set a new array to the localStorage.
    const updatedCharacters = characters.filter(item => {
      if ((Date.now() - item.fetched_date) < (2 * 60 * 60 * 1000)) {
        return item;
      }

      return false;
    })
    setCharacters(updatedCharacters);                     
  }, []);

  return (
    <CharactersContext.Provider value={{ 
      setLoading, 
      setNotFound, 
      setCurrentInputValue, 
      loading, 
      currentInputValue,
      setActiveCharacter,
      activeCharacter,
      characters,
      setCharacters
    }}>
      <div className="App">
        <Container>
          <Row>
            <Col lg={3}>
              <Search />
              <CharacterPhoto />
            </Col>
            <Col lg={8}>
              {!!Object.keys(activeCharacter).length && <CharacterInfo />}
              {notFound && <h2 className="not_found">Character not found</h2>}
            </Col>
            <Col lg={1}>
              {!!characters.length && <div className="text-center"><CharacterCacheList /></div>}
            </Col>
          </Row>
        </Container>
      </div>
    </CharactersContext.Provider>
  );
}

export default App;