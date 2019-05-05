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
		seen: [],
		interests: []
  }

  componentDidMount = () => {
    
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
        .then(data => {
          data.user.views.map(view => this.setState({ seen: [view.movie, ...this.state.seen]}))
          data.user.interests.map(interest => this.setState({ interests: [interest.movie, ...this.state.interests]}))
          this.setState({ user: data.user}, () => console.log("Does this user have interests?", data.user))
        })
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

	addMovieAsSeen = (user_id, movie_id) => {

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
			.then(data => {
        this.setState({seen: [data.movie, ...this.state.seen]})
      })
  }
  
  addMovieAsMustSee = (user_id, movie_id) => {

		let token = localStorage.token;

		fetch("http://localhost:3000/api/v1/interests", {
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
			.then(data => {
        this.setState({interests: [data.movie, ...this.state.interests]}, () => console.log("Are we getting data?", data))
      })
	}



	buyMovie = (e, id, user) => {
		
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
				}) ;

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
        this.setState({ user: data.user });
        data.user.views.map(view => this.setState({ seen: [view.movie, ...this.state.seen]}))
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
          user.user.views.map(view => this.setState({ seen: [view.movie, ...this.state.seen]}));
        }
      });
  };


  logout = () => {
    console.log("LOGOUT!");
    localStorage.removeItem('token');
    this.setState({user: {}, seen: [], interests: []});
  }

	render() {
    
    return (
      <div>
          <Navbar user={this.state.user} seen={this.state.seen} interests={this.state.interests} allMovies={this.state.movies}/>
					<Switch>
            <Route
              path="/login"
              render={() => <Login submitHandler={this.loginSubmitHandler} name="Login"/>}
              />
            <Route
            path="/signup"
            render={  () => <Login submitHandler={this.signupSubmitHandler} name="Sign Up"/>  }/>
          	<Route path="/movies/popular" render={() => <MoviesContainer movies={this.state.popularMovies} addMovieAsMustSee={this.addMovieAsMustSee} addMovieAsSeen={this.addMovieAsSeen} mustSee={this.state.interests} seen={this.state.seen} user={this.state.user} logout={this.logout}/>} />
						<Route path="/movies/top-rated" render={() => <MoviesContainer movies={this.state.topRatedMovies} addMovieAsMustSee={this.addMovieAsMustSee} addMovieAsSeen={this.addMovieAsSeen} mustSee={this.state.interests} seen={this.state.seen} user={this.state.user} logout={this.logout}/>} />
						<Route path="/movies/now-playing" render={() => <MoviesContainer movies={this.state.nowPlayingMovies} addMovieAsMustSee={this.addMovieAsMustSee} addMovieAsSeen={this.addMovieAsSeen} mustSee={this.state.interests} seen={this.state.seen} user={this.state.user} logout={this.logout}/>} />
						<Route path="/movies/upcoming" render={() => <MoviesContainer movies={this.state.upcomingMovies} addMovieAsMustSee={this.addMovieAsMustSee} addMovieAsSeen={this.addMovieAsSeen} mustSee={this.state.interests} seen={this.state.seen} user={this.state.user} logout={this.logout}/>} />
						<Route path="/movies" render={() => <MoviesContainer movies={this.state.movies} addMovieAsMustSee={this.addMovieAsMustSee} addMovieAsSeen={this.addMovieAsSeen} mustSee={this.state.interests} seen={this.state.seen} user={this.state.user} logout={this.logout}/>} />
					</Switch>
      </div>
    )
  };
}

export default App;
