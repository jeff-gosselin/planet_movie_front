import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";



var moment = require('moment');

const MovieCard = ({movie, showSingleMovie}) => {
	const {title, vote_average, overview, release_date, poster_path, backdrop_path, ref_code} = movie;
	console.log("poster", poster_path);
	
  return (
    <div className="flex-child">
      <div>

				<div className="rel">
					<div className="c">
						
						<div >
							<h3 className="title">{title}
								<span className="release-date"> ({moment(release_date).format("YYYY")})</span>
							</h3>
							<p ></p>
						</div>

					
						<div >
							<p>Fan Score: <span className="bold">{vote_average}/10</span></p>

							<p className="white-text">{overview.substring(0, 100)}...</p>
							
							<div className="rent-buy-container">
								<Link to={`/movies/${ref_code}`}><button onClick={(e) => showSingleMovie(e, movie, ref_code)} className="rent-buy-btn">Rent or Buy</button></Link>
							</div>
						</div>

					</div>
					<img src={`http://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
					
					
					

				</div>
			</div>
		</div>
			

  )
}

export default MovieCard;

