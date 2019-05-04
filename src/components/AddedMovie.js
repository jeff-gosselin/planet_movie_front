import React, { Component } from 'react'
import '../css/addedMovie.css';

class AddedMovie extends Component {
  render() {
      const {poster_path, title} = this.props.movie;
      console.log("AddedMovie Comp: ", poster_path);
      
    return (
      <div className="added-movies">

        <img width="56" src={`http://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
      </div>
    )
  }
}

export default AddedMovie;