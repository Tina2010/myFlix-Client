import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import MoviesList from '../movie-list/movie-list';
import { MovieView } from '../movie-view/movie-view';
import { RegiView } from '../user-registration-view/user-registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavBarView } from '../navbar-view/navbar-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

import { setMovies } from '../../actions/actions';
class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null
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
          this.props.setMovies(response.data);
          console.log(response.data)
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
      const { user } = this.state;
      const { movies } = this.props;

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
                return <MoviesList movies={movies}/>;
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
              <Route path="/:movieId/director/" render={({ match, history }) => {
                if (!user) 
                return 
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  {/* The directors info is embedded in a separate document and referenced in the movie document with their ID */}
                  <DirectorView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => 
                    history.goBack()}/>
                </Col>
              }} />
              <Route path="/:movieId/genre" render={({ match, history }) => {
                if (!user) 
                return 
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  {/* The genres info is embedded in a separate document and referenced in the movie document with their ID */}
                  <GenreView 
                    movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => 
                    history.goBack()} />
                </Col>
              }
              } />
              <Route path="/profile" render={({ match, history }) => {
                if (!user) 
                return 
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <ProfileView history={history} movies={movies} movie={movies.find(m => m._id === match.params.movieId)} />
                </Col>
              }} />
            </Row>
      </Router>
      );
    }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(MainView);