import React from 'react';
// import apiConfig from '../apiKeys';
import {Route, Switch, Redirect} from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Search from '../components/Search';
import ShowContainer from './ShowContainer';
// import Login from '../components/Login';

// const popularMoviesURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiConfig.tmdbKey}`
const baseURL = "http://localhost:3000/api/v1/movies"


class MoviesContainer extends React.Component {
  state = {
    movies: [],
    popularMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    nowPlayingMovies: [],
    singleMovie: null,
    moviePath: ""
  }

  componentDidMount = () => {
    fetch(baseURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      const popularMovies = data.filter(movie => movie.category === "popular")
      const nowPlayingMovies = data.filter(movie => movie.category === "now_playing")
      const upcomingMovies = data.filter(movie => movie.category === "upcoming")
      const topRatedMovies = data.filter(movie => movie.category === "top_rated")

      this.setState({
        movies: data,
        popularMovies,
        topRatedMovies,
        upcomingMovies,
        nowPlayingMovies
      }, () => console.log("This is the state", this.state)
      )
    })
  }

  showSingleMovie = (e, movie, ref_code) => {
    this.setState({
      singleMovie: movie,
      moviePath: ref_code
    })
  }

  formatMovieCards = movies => {
    return movies.map(movie => {
      return <MovieCard movie={movie} key={movie.id} showSingleMovie={this.showSingleMovie} />
    })
  }

	showSingleMovie = (e, movie, ref_code) => {

		this.setState({
			singleMovie: movie,
			moviePath: ref_code
		})
	}

  render() {

    return (
      <div id="right-col">

        <Search />

        <div uk-height-match="true" className="flexify">
        <Switch>
          <Route path="/movies/popular" render={() => this.formatMovieCards(this.state.popularMovies)} />
          <Route path="/movies/top-rated" render={() => this.formatMovieCards(this.state.topRatedMovies)} />
          <Route path="/movies/now-playing" render={() => this.formatMovieCards(this.state.nowPlayingMovies)} />
          <Route path="/movies/upcoming" render={() => this.formatMovieCards(this.state.upcomingMovies)} />
          <Route
          path="/movies/:ref_code"
          render={routerProps => {
            let ref_code = routerProps.match.params.ref_code;
            let movie = this.state.movies.find(movie => movie.ref_code == parseInt(ref_code))
            console.log("this is the movie:", movie);
            console.log("these are routerProps", routerProps);
            console.log("this is the ref code:", ref_code);
            console.log("these are all the movies in state:", this.state.movies)
            return <ShowContainer movie={movie} />;
          }}
          />
        </Switch>
        </div>
      </div>
    )
  }
}

export default MoviesContainer;
