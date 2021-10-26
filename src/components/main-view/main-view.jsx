import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegiView } from '../user-registration-view/user-registration-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null,
          register: null
        };
    }

    componentDidMount(){
      axios.get('https://obscure-castle-33842.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    }

    onRegister(register) {
      this.setState({
        register
      });
    }
  
    onLoggedIn(user) {
      this.setState({
        user
      });
    }

      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }
    

      /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

    render() {
      const { movies, selectedMovie, user, register } = this.state;
      /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


      if (!register) return <RegiView onRegister={register => this.onRegister(register)} />

      // Before the movies have been loaded
      if (movies.length === 0) return <div className="main-view" />;

      return (
          <Row className="main-view justify-content-md-center">
            {selectedMovie
              ? (
                  <Col md={8}>
                    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  </Col>
              )
              : movies.map(movie => (
                    <Col md={4}>
                      <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
                    </Col>
                  ))
            }
          </Row>
      );
    }
}
export default MainView;