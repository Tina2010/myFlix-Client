import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Link from "react-router-dom/Link";

import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;
  
    return(
        <Card className="m-5" style={{ height: '300px' }}>
          <Card.Img src={movie.ImagePath} />
          <Card.ImgOverlay className="movieCardBody p-0" style={{ overflow: "overlay" }}>
            {/* Overlay will be removed, after I implemented post methode to change Description -> need to make them shorter*/}
            <Card.Body className="bt-5">
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button variant="outline-light">Open</Button>
              </Link>
            </Card.Body>
          </Card.ImgOverlay>
        </Card>
    ); 
  }
}