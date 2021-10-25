import React from 'react';
import PropTypes from 'prop-types';

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick } = this.props;
    
        return (
          <div className="director-view">
            <div className="director-name">
              <span className="label">Name: </span>
              <span className="value">{director.Name}</span>
            </div>
            <div className="director-bio">
              <span className="label">Bio: </span>
              <span className="value">{director.Bio}</span>
            </div>
            <button onClick={() => { onBackClick(null); }}>Back</button>
           </div>
           
        );
      }
}

DirectorView.prototype = {
    director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string
})};