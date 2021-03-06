import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import MovieInterface from './MovieInterface';



var moment = require('moment');

const MovieCard = ({movie, showSingleMovie, addMovieAsSeen, addMovieAsMustSee, user, mustSeeMovies, seenMovies}) => {
	const {title, vote_average, overview, release_date, poster_path, ref_code} = movie;
	
	console.log("mustSeeMovies", mustSeeMovies);
	
	
	
	
  return (
    <div className="flex-child">
      

				<div className="rel">
					
					<div className="movie-overlay">
						
						<div className="movie-overlay-info">
							<h3>{title}</h3>
							<span className="release-date"> ({moment(release_date).format("YYYY")})</span>
							<p></p>
							<p>Fan Score: <span className="bold">{vote_average}/10</span></p>
							<p className="overview">{overview.substring(0, 100)}...</p>
							
							<div className="rent-buy-container">
								<Link to={`/movies/${ref_code}`}>
									<button onClick={(e) => showSingleMovie(e, movie, ref_code)} className="rent-buy-btn">More Info</button>
								</Link>
							</div>

						</div>
						<MovieInterface addMovieAsMustSee={addMovieAsMustSee} addMovieAsSeen={addMovieAsSeen} mustSeeMovies={mustSeeMovies} seenMovies={seenMovies} user={user} movie={movie} />
					</div>
					
					
					<img src={`http://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
					
					

				</div>
			
		</div>
			

  )
}

export default MovieCard;

