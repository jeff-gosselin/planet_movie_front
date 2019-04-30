import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";



var moment = require('moment');

const MovieCard = ({movie, showSingleMovie}) => {
  const {title, vote_average, overview, release_date, poster_path, backdrop_path, ref_code} = movie
  return (
    <div className={`flex-child`}>
      <div>

			<div className="uk-inline uk-visible-toggle">
					<img data-src={`http://image.tmdb.org/t/p/w500/${poster_path}`} alt=""  uk-img="true"/>
					<div className="uk-overlay-default uk-position-cover uk-invisible-hover c"></div>
					<div className="uk-overlay uk-position-bottom uk-dark uk-invisible-hover">
					<div className="uk-card-header">
						<h3 className="uk-card-title white-text">{title}
							<span className="release-date uk-text-small"> ({moment(release_date).format("YYYY")})</span>
						</h3>
						<p className="uk-text-meta"></p>
					</div>
					<div className="uk-card-body white-text">
						<p>Fan Score: <span className="bold">{vote_average}/10</span></p>

						<p className="white-text">{overview.substring(0, 100)}...</p>
						<div className="rent-buy-container">
							<Link to={`/movies/${ref_code}`}><button onClick={(e) => showSingleMovie(e, movie, ref_code)} className="rent-buy-btn">Rent or Buy</button></Link>
						</div>

					</div>
				</div>
					</div>
			</div>


      </div>

  )
}

export default MovieCard;
