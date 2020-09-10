import React from 'react';
import './App.css';
import CatList from './components/CuteCats/CuteCats'
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      
      <Container>
        <CatList/>
      </Container>
    </div>
  );
}



export default App;
