import React from 'react';
import PropTypes from 'prop-types';

import './movie-card.scss';

export class MovieCard extends React.Component {

/*   Test for mounting features:
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  };

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  } */


  render() {
    const { movie, onMovieClick } = this.props;
  
    return(
    <div>
        <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>
    </div>
    ); 
  }
}

MovieCard.prototype = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};