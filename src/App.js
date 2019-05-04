import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import MoviesContainer from './containers/MoviesContainer';
import Signup from "./components/Signup";
import Login from "./components/Login";
import ShowContainer from './containers/ShowContainer';

const baseURL = "http://localhost:3000/api/v1/movies";

class App extends Component {
  state = {
    movies: [],
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    nowPlayingMovies: [],
    user: {},
		rentals: [],
		buys: []
  }

  componentDidMount = () => {
    console.log("Mounted");
    if (localStorage.token) {
      let token = localStorage.token;
      fetch("http://localhost:3000/api/v1/profile", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => this.setState({ user: data.user }));
    }
    
    
    
		// 	// Remove at a later time: duplicate fetch
		// 	fetch(baseURL, {
	  //     method: "GET",
	  //     headers: {
	  //       Authorization: `Bearer ${localStorage.token}`
	  //     }
	  //   })
	  //   .then(res => res.json())
	  //   .then(data => this.setState({movies: data}))

  }

	addMovieAsSeen = (e, user_id, movie_id) => {

		let token = localStorage.token;

		fetch("http://localhost:3000/api/v1/views", {
      method: "POST",
      body: JSON.stringify({
				user_id,
        movie_id
			}),
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
				Authorization: `Bearer ${token}`
      }
    })
      .then(resp => resp.json())
			.then(data => console.log("fetched data for seen movies: ", data.movie))
	}



	buyMovie = (e, id, user) => {
		console.log("buying");
		let token = localStorage.token;

		fetch("http://localhost:3000/api/v1/purchases", {
      method: "POST",
			body: JSON.stringify({purchase: {
				user_id: user.id,
				movie_id: id
			}}),
      headers: {
        "content-type": "application/json",
        accepts: "application/json",
				Authorization: `Bearer ${token}`
      }
    })
      .then(resp => resp.json())
			.then(buy => {
				this.setState({
					buys: [buy.movie, ...this.state.buys]
				}, () => console.log("My buy state:",this.state.buys)) ;

			})
	}

  signupSubmitHandler = userInfo => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({ user: userInfo })
    })
      .then(resp => resp.json())
      .then(data => {
        localStorage.setItem("token", data.jwt);
        this.setState({ user: data.user }, () => console.log(this.state));
      });
  };

  loginSubmitHandler = userInfo => {
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      body: JSON.stringify({user: userInfo}),
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      }
    })
      .then(resp => resp.json())
      .then(user => {
        if (user.message) {
          return <Redirect to="/login" />;
        } else {
          localStorage.setItem("token", user.jwt);
          this.setState({ user: user.user }, () => console.log("User is logged in from loginSubmitHandler!", user));
        }
      });
  };


  logout = () => {
    console.log("LOGOUT!");
    localStorage.removeItem('token');
    this.setState({user: {}});
  }

	render() {
    console.log("The user is: ", this.state.user);
    return (
      <div>
          <Navbar user={this.state.user} rentals={this.state.rentals} buys={this.state.buys} allMovies={this.state.movies}/>
					<Switch>
            <Route
              path="/login"
              render={() => <Login submitHandler={this.loginSubmitHandler} name="Login"/>}
              />
            <Route
            path="/signup"
            render={  () => <Login submitHandler={this.signupSubmitHandler} name="Sign Up"/>  }/>
          	<Route path="/movies/popular" render={() => <MoviesContainer movies={this.state.popularMovies} addMovieAsSeen={this.addMovieAsSeen} user={this.state.user} logout={this.logout}/>} />
						<Route path="/movies/top-rated" render={() => <MoviesContainer movies={this.state.topRatedMovies} addMovieAsSeen={this.addMovieAsSeen} user={this.state.user} logout={this.logout}/>} />
						<Route path="/movies/now-playing" render={() => <MoviesContainer movies={this.state.nowPlayingMovies} addMovieAsSeen={this.addMovieAsSeen} user={this.state.user} logout={this.logout}/>} />
						<Route path="/movies/upcoming" render={() => <MoviesContainer movies={this.state.upcomingMovies} addMovieAsSeen={this.addMovieAsSeen} user={this.state.user} logout={this.logout}/>} />
						<Route path="/movies" render={() => <MoviesContainer movies={this.state.movies} addMovieAsSeen={this.addMovieAsSeen} user={this.state.user} logout={this.logout}/>} />
					</Switch>
      </div>
    )
  };
}

export default App;
