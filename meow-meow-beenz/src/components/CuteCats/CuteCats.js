import React, { Component } from 'react';
import './CuteCats.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import axios from "axios";
import { Button, ButtonGroup } from 'react-bootstrap';

export default class CuteCats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalCatList: [],
      catList: []
    }
  }

  componentDidMount() {
    this.getCatList();
  }

  getCatList() {
    axios.get("http://localhost:10000/cats").then(res => {
        this.setState({catList: res.data, originalCatList: res.data})
    }).catch(function(error) {
    });
  }

  sortCats = (order) => {
    const sortedCuteCats = [].concat(this.state.originalCatList)
      .sort((a, b) => a.cutenessLevel <= b.cutenessLevel ? 1 : -1);
    this.setState({catList: (order === "none" ? this.state.originalCatList : 
      (order === "cute" ? sortedCuteCats : sortedCuteCats.reverse()))});
  }

  render() {
    return(
      <div>
        <ButtonGroup>
          <Button variant="secondary" onClick={() => this.sortCats("none")}>None</Button>
          <Button variant="secondary" onClick={() => this.sortCats("cute")}>Much cute</Button>
          <Button variant="secondary" onClick={() => this.sortCats("nocute")}>Not cute</Button>
        </ButtonGroup>
        <hr/> 
        <CatList cats={this.state.catList}/>
      </div>
    )
  }
}

const CatPicture = ({cat}) => {
  return <Col md={6}>
          <figure>
            <Image src={process.env.PUBLIC_URL + "images/" + cat.image} className="img-responsive" alt="Responsive image"/>
            <figcaption>{cat.name}</figcaption>
          </figure>
            
          </Col>
}

const CatList = ({cats}) => {
  const catPictures = cats.map((cat) => {
    return (<CatPicture key={cat.name} cat={cat} cutenessLevel={cat.cutenessLevel}/>)
  });

  return (<Row>{catPictures}</Row>);
}
