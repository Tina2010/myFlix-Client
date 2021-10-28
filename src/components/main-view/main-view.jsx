import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegiView } from '../user-registration-view/user-registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavBarView } from '../navbar-view/navbar-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [],
          user: null,
          Username: '',
          Password: '',
          Email: '',
          Birthday: ''          
        };
    }

    componentDidMount(){
      let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getMovies(accessToken);
        }
    }
  
    

      /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

      onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
      }

      getMovies(token) {
        axios.get('https://obscure-castle-33842.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          console.log('response', response )
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }



      onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
          user: null
        });
      }


    render() {
      const { movies, user } = this.state;

      return (
        <Router>
          <NavBarView />
            <Row className="mt-5 main-view justify-content-md-center">
              <Route exact path="/" render={() => {
                /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                </Col>  
                if (movies.length === 0) return <div className="main-view" />;
                return movies.map(m => (
                  <Col md={4} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ))
              }} />
              <Route path="/register" render={() => {
                if (user) return <Redirect to="/" />
                return <Col>
                  <RegiView />
                </Col>
              }} />
              <Route path="/movies/:movieId" render={({ match, history }) => {
                if (!user) 
                return 
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                </Col>
                if (user)
                return <Col md={8}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                </Col>
              }} />
              <Route path="/directors/:Name" render={({ history }) => {
                if (!user) 
                return 
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <DirectorView history={history} movies={movies} />
                </Col>
              }} />
              <Route path="/genres/:Name" render={({ match, history }) => {
                if (!user) 
                return 
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  {/* DThe genres info is embedded in a separate document and referenced in the movie document with their ID */}
                  <GenreView genre={movies.find(m => m.Genre._id === match.params.genreId).Genre} onBackClick={() => history.goBack()} />
                </Col>
              }
              } />
              <Route path="/profile" render={({ history }) => {
                if (!user) 
                return 
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <ProfileView history={history} movies={movies} />
                </Col>
              }} />
            </Row>
      </Router>
      );
    }
}
export default MainView;