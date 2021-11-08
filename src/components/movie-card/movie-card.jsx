import React from 'react';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {Link} from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;
  
    return(
      <Row xs={1} md={1} className="g-4 mt-3">
          <Col className="m-3">
            <Card style={{'maxWidth': '300px'}}>
            <Card.Img style={{'maxWidth': '300px'}} src={movie.ImagePath} />
              <Card.ImgOverlay style={{'padding':'0'}}>
                <Card.Body style={{'backgroundColor':'#303f52a2', 'boxShadow': '0px 8px 7px rgb(48 63 82 / 64%)'}}>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text className="cropText"style={{'overflow':'overlay'}}>{movie.Description}</Card.Text>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="outline-light">Open</Button>
                  </Link>
                </Card.Body>
              </Card.ImgOverlay>
            </Card>
          </Col>
      </Row>
    )
  }
}