import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { movie, onMovieClick } = this.props;
  
    return(
        <Card className="mb-5" style={{ height: '300px' }}>
          <Card.Img src={movie.ImagePath} />
          <Card.ImgOverlay className="movieCardBody p-0" style={{ overflow: "overlay" }}>
            {/* Overlay will be removed, after I implemented post methode to change Description -> need to make them shorter*/}
            <Card.Body className="bt-5">
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Button onClick={() => onMovieClick(movie)} variant="secondary">Open</Button>
            </Card.Body>
          </Card.ImgOverlay>
        </Card>
    ); 
  }
}

MovieCard.prototype = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};