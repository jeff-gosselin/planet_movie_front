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
    moviePath: "",
    searchTerm: ""
  }

  componentDidMount = () => {
    fetch(baseURL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
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
    let filteredMovies = movies.filter(movie=>movie.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))

    return filteredMovies.map(movie => {
      return <MovieCard user={this.props.user} addMovieAsSeen={this.props.addMovieAsSeen} movie={movie} key={movie.id} showSingleMovie={this.showSingleMovie} />
    })
  }


  filterMovies = event => {
    this.setState({
      searchTerm: event.target.value
    }, console.log("The search bar is typing", this.state.searchTerm))
  }

  render() {
    
    
    return (
      <div>

        <Search filterMovies={this.filterMovies} searchTerm={this.state.searchTerm} user={this.props.user} logout={this.props.logout} />

        <div className="flexify" id="right-col">
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
            return <ShowContainer movie={movie} rentMovie={this.props.rentMovie} buyMovie={this.props.buyMovie} user={this.props.user}/>;
          }}
          />
          <Route path="/movies" render={() => this.formatMovieCards(this.state.movies)} />
        </Switch>
        </div>
      </div>
    )
  }
}

export default MoviesContainer;
