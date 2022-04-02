import React from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Image } from 'react-bootstrap';

import {Link} from "react-router-dom";


import './movie-view.scss';
import { Image } from 'react-bootstrap';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {
      isFavorite: 'Mark as Favorite'
    };
  }

  onFavorite() {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');

    this.setState({
      isFavorite: 'Added a favorite!'
    });

    axios.post(`https://obscure-castle-33842.herokuapp.com/users/${Username}/movies/` + this.props.movie._id, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


    render() {
        const { movie, onBackClick } = this.props;
        return (
          <div className="movie-view">
            <Row className="mt-5 pt-4">
              <Col>
                <Row className="movie-title">
                  <Col className="value pb-5" style={{fontSize:"40px"}}>{movie.Title}&nbsp;
                  <Button variant='warning' size="sm" onClick={() => this.onFavorite()} >{this.state.isFavorite}</Button>
                  </Col>
                </Row>
                <Row className="movie-genre">
                  <Col className="label" md={2}>Genre: </Col>
                  <Col className="value">
                    <Link to={`/${movie._id}/genre`}>
                    <Button variant="link" >{movie.Genre[0].Name}</Button>
                    </Link>
                  </Col>
                </Row>
                <Row className="movie-director">
                  <Col className="label"md={2}>Director: </Col>
                  <Col className="value">
                  <Link to={`/${movie._id}/director`}>
                    <Button variant="link">{movie.Director[0].Name}</Button>
                  </Link>
                  </Col>
                </Row>
                <Row className="movie-description">
                  <Col className="label pt-5"md={2}>Description: </Col>
                </Row>
                <Row className="movie-description">
                  <Col className="value">{movie.Description}</Col>
                </Row>
                <Button className="mt-3" variant="outline-light" onClick={() => { onBackClick(null); }}>Back</Button>
              </Col>
              <Col><Image src={movie.ImagePath}></Image></Col>
            </Row>
            
           </div>
           
        );
      }
}
