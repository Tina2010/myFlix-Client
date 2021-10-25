import React from 'react';
import PropTypes from 'prop-types';

import './movie-view.scss';

export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;
    
        return (
          <div className="movie-view">
            <div className="movie-poster">
              {/* <img src={movie.ImagePath} /> */}
              <span className="label">Post: (Will be included, when I implemented the post methode to update movies.)</span>
            </div>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-genre">
              <span className="label">Genre: (Will come with the next update, when I implement routes.)</span>
              {/* <Link to={`/genres/${movie.genre.name}`}>{movie.genre.name}</Link> */}
            </div>
            <div className="movie-director">
              <span className="label">Director: (Will come with the next update, when I implement routes.)</span>
              {/* <Link to={`/directors/${movie.director.name}`}>{movie.director.name}</Link> */}
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <button onClick={() => { onBackClick(null); }}>Back</button>
           </div>
           
        );
      }
}

MovieView.prototype = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Descripton: PropTypes.string,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.array,
    Director: PropTypes.array
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};