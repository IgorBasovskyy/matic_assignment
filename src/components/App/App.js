import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Search from '../Search/Search';
import CharacterPhoto from '../CharacterPhoto/CharacterPhoto';
import placeholder from '../../assets/images/placeholder.jpg';

const IMAGE_PLACEHOLDER = {
  src: placeholder,
  alt: "placeholder"
}

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Container>
        <Row>
          <Col lg={3}>
            <Search />
            <CharacterPhoto 
              image={IMAGE_PLACEHOLDER} 
              loading={loading}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
