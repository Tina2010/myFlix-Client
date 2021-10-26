import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './movie-view.scss';

export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;
    
        return (
          <div className="movie-view">
            <Row>
              <Col>
                <Row className="movie-title">
                  <Col className="value pb-5" style={{fontSize:"40px"}}>{movie.Title}</Col>
                </Row>
                <Row className="movie-genre">
                  <Col className="label" md={2}>Genre: </Col>
                  <Col className="value">(Will come with the next update, when I implement routes.)</Col>
                  {/* <Link to={`/genres/${movie.genre.name}`}>{movie.genre.name}</Link> */}
                  <Col className="value">{movie.ImagePath}</Col>
                </Row>
                <Row className="movie-director">
                  <Col className="label"md={2}>Director: </Col>
                  <Col className="value">(Will come with the next update, when I implement routes.)</Col>
                  {/* <Link to={`/directors/${movie.director.name}`}>{movie.director.name}</Link> */}
                </Row>
                <Row className="movie-description">
                  <Col className="label pt-5"md={2}>Description: </Col>
                </Row>
                <Row className="movie-description">
                  <Col className="value">{movie.Description}</Col>
                </Row>
                <Button className="mt-3" variant="outline-light" onClick={() => { onBackClick(null); }}>Back</Button>
              </Col>
            </Row>
           </div>
           
        );
      }
}

MovieView.prototype = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Descripton: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.array,
    Director: PropTypes.array
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};