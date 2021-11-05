import React from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card, ListGroup, CardGroup,  ListGroupItem } from 'react-bootstrap';
import { connect } from 'react-redux';

import './profile-view.scss';

import { setUser, updateUser } from '../../actions/actions';

export class ProfileView extends React.Component {

    constructor() {
      super();
       this.state = {
        Username: null,
        Password: null,
        Email: null,
        Birthday: null,
        FavoriteMovies: []
      };
    }
  
    componentDidMount() {
      let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          this.setState({
            user: localStorage.getItem('user')
          });
          this.getUser(accessToken);
        }
    }
  
    getUser(token) {
      const Username = localStorage.getItem("user");
      axios
        .get(`https://obscure-castle-33842.herokuapp.com/users/${Username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          this.setState({
            Username: response.data.Username,
            Password: response.data.Password,
            Email: response.data.Email,
            Birthday: response.data.Birthday,
            FavoriteMovies: response.data.FavoriteMovies,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    
  
    removeFavMovies(movie) {
      const token = localStorage.getItem("token");
      const Username = localStorage.getItem("user");
      axios
        .delete(
          `https://obscure-castle-33842.herokuapp.com/users/${Username}/movies/${movie._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          alert('Movie was removed');
          this.componentDidMount();
        })
        .catch(function (error) {
          console.log(error);
          console.log(movie);
        })
    }
  
    handleUpdate(e) {
      e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

      axios
        .put(`https://obscure-castle-33842.herokuapp.com/users/${username}`, {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          this.setState({
            Username: response.data.Username,
            Password: response.data.Password,
            Email: response.data.Email,
            Birthday: response.data.Birthday
          });
          localStorage.setItem('user', response.data.Username);
          const data = response.data;
          console.log(data);
          console.log(response.data.Username);
          alert("Profile updated.");
          window.open(`/profile`, '_self');
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    handleDeleteUser(e) {
      e.preventDefault();
  
      const token = localStorage.getItem("token");
      const Username = localStorage.getItem("user");
  
      axios
        .delete(`https://obscure-castle-33842.herokuapp.com/users/${Username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          alert("Your account has been deleted.");
          window.open(`/`, "_self");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  
    setUsername(value) {
      this.state.Username = value;
    }
  
    setPassword(value) {
      this.state.Password = value;
    }
  
    setEmail(value) {
      this.state.Email = value;
    }
  
    setBirthday(value) {
      this.state.Birthday = value;
    }

    render() {
      const { FavoriteMovies, validated, Username, Email, Birthday, user } = this.state;
      const { movies } = this.props;

      return (
        <Container className="mt-5">
          <Row>
            <Col xs={12} sm={4} className="mb-5">
              <Card style={{'border-color':'#303f52'}}>
                <Card.Body>
                  <Card.Title>Profile Info</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem className="listitem">Username: {Username} </ListGroupItem>
                  <ListGroupItem className="listitem">Password: *** </ListGroupItem>
                  <ListGroupItem className="listitem">Email: {Email} </ListGroupItem>
                  <ListGroupItem className="listitem">Birthday: {Birthday} </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
  
            <Col xs={12} sm={8} className="mb-5">
                    <Card style={{'border-color':'#303f52'}}>
                       <Card.Body>
                          <Card.Title>Update</Card.Title>
  
                              <Form
                                noValidate
                                validated={validated}
                                className="update-form"
                                onSubmit={(e) =>
                                  this.handleUpdate(
                                    e,
                                    this.Username,
                                    this.Password,
                                    this.Email,
                                    this.Birthday
                                  )
                                }
                              >
                                <Form.Group controlId="formUsername">
                                  <Form.Label>Username:</Form.Label>
                                  <Form.Control
                                    type="text"
                                    onChange={(e) =>
                                      this.setUsername(e.target.value)
                                    }
                                    placeholder="Username"
                                  />
                                </Form.Group>
  
                                <Form.Group controlId="formPassword">
                                  <Form.Label>Password:</Form.Label>
                                  <Form.Control
                                    type="password"
                                    onChange={(e) =>
                                      this.setPassword(e.target.value)
                                    }
                                    minLength="8"
                                    placeholder="Change your password"
                                  />
                                </Form.Group>
  
                                <Form.Group controlId="formEmail">
                                  <Form.Label>Email:</Form.Label>
                                  <Form.Control
                                    type="email"
                                    onChange={(e) =>
                                      this.setEmail(e.target.value)
                                    }
                                    placeholder="Change your email"
                                  />
                                </Form.Group>

                                <Form.Group controlId="formBirthday" className="mb-2">
                                  <Form.Label>Birthday:</Form.Label>
                                  <Form.Control
                                    type="date"
                                    onChange={(e) =>
                                      this.setBirthday(e.target.value)
                                    }
                                    placeholder="Change your birthday"
                                  />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                  Update
                                </Button>
                              </Form>
                        </Card.Body>
                    </Card>
            </Col>
          </Row>
  
          <Card className="mb-2">
            <Row>
              <Col xs={12}>
                <h4>Favorite Movies</h4>
              </Col>
            </Row>
  
            <Row>
              <Col>
                <Card.Body>
                  {FavoriteMovies.length === 0 && (
                    <div className="text-center">
                      You have no favorite movies.
                    </div>
                  )}
                  <Row style={{'border-color':'#303f52'}}>
                    {FavoriteMovies.length > 0 &&
                      movies.map((movie) => {
                        if (
                          movie._id ===
                          FavoriteMovies.find((fav) => fav === movie._id)
                        ) {
                          return (
                              <Card
                                style={{ 'width': '16rem', 'border-color':'#303f52'}}
                                key={movie._id}
                              >
                                <Card.Img
                                  style={{ width: "18rem" }}
                                  className="movieCard"
                                  variant="top"
                                  src={movie.ImageURL}
                                />
                                <Card.Body style={{ 'background-color': 'white'}}>
                                  <Card.Title className="movie-card-title" style={{ 'color': 'black'}}>
                                    {movie.Title}
                                  </Card.Title>
                                  <Button
                                    size="sm"
                                    className="profile-button remove-favorite"
                                    variant="danger"
                                    value={movie._id}
                                    onClick={() =>
                                      this.removeFavMovies(movie)
                                    }
                                  >
                                    Remove
                                  </Button>
                                </Card.Body>
                              </Card>
                          );
                        }
                      })}
                  </Row>
                </Card.Body>
              </Col>
            </Row>
          </Card>
          <Button
                  variant="secondary"
                  onClick={(e) => this.handleDeleteUser(e, user)}
                >
                  Delete Account
                </Button>
        </Container>
      );
    }
  }

  let mapStateToProps = state => {
    return {
      user: state.user,
      movies: state.movies
    }
  }
  
  export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);