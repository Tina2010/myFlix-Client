import React from 'react';
import PropTypes from 'prop-types';

export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick } = this.props;
    
        return (
          <div className="genre-view">
            <div className="genre-title">
              <span className="label">Name: </span>
              <span className="value">{genre.Name}</span>
            </div>
            <div className="genre-description">
              <span className="label">Description: </span>
              <span className="value">{genre.Description}</span>
            </div>
            <button onClick={() => { onBackClick(null); }}>Back</button>
           </div>
           
        );
      }
}

GenreView.prototype = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Descripton: PropTypes.string
})};