import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './genre-view.scss';

export class GenreView extends React.Component {


  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="genre-view">
        <Row className="mt-5 pt-5">
          <Col>
            <Row className="genre-title">
              <Col className="value pb-5" style={{fontSize:"40px"}}>{movie.Genre[0].Name}</Col>
            </Row>
            <Row className="genre-description">
              <Col className="label pt-5"md={2}>Description: </Col>
            </Row>
            <Row className="genre-description">
              <Col className="value">{movie.Genre[0].Description}</Col>
            </Row>
            <Button className="mt-3" variant="outline-light" onClick={() => { onBackClick(null); }}>Back</Button>
          </Col>
        </Row>
       </div>
       
    );
  }
}