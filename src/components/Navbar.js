import React from 'react';
import { Link } from "react-router-dom";
import MyMovie from './MyMovie'

const Navbar = ({sectionClickHandler, user, rentals, buys, allMovies}) => {
  console.log("Navbar User: ", user);
  
  return (
    <div>
      <div className="branding depth">Movie Seen</div>
      <aside id="left-col" className="uk-light">
      <div className="branding">Movie Seen</div>
        <div className="bar-wrap">
        {/* <a className="uk-navbar-item uk-logo"> <span className="uk-margin-small-right" uk-icon="icon: play-circle"></span>Planet Movie</a> */}
          <div className="spacer"></div>
          <ul className="uk-nav-default uk-nav-parent-icon" uk-nav="true">
              {user.name && <li><a><span className="uk-margin-small-right" uk-icon="icon: user"></span>Welcome {user.name}</a></li>}
              <li className="uk-nav-divider"></li>

              <li className="uk-active"><Link to="/movies">Home</Link></li>
              <li className="uk-parent">
                  <a>Movies</a>
                  <ul className="uk-nav-sub">
                      <li><Link to="/movies/popular">Most Popular</Link></li>
                      <li><Link to="/movies/now-playing">Now Playing</Link></li>
                      <li><Link to="/movies/top-rated">Top Rated</Link></li>
                      <li><Link to="/movies/upcoming">Upcoming</Link></li>
                  </ul>
              </li>
              <li className="uk-parent">
                  <a>Categories</a>
                  <ul className="uk-nav-sub">
                      <li><a>Coming Soon!</a></li>
                  </ul>
              </li>
              <li className="uk-nav-header">Must See</li>
              
              <li className="uk-nav-header">Seen</li>




          </ul>
        </div>
      </aside>
    </div>
  )
}

// <li><a><span className="uk-margin-small-right" uk-icon="icon: table"></span> Item</a></li>
// <li><a><span className="uk-margin-small-right" uk-icon="icon: thumbnails"></span> Item</a></li>

// <li className="uk-nav-divider"></li>
// <li><a><span className="uk-margin-small-right" uk-icon="icon: trash"></span> Item</a></li>

export default Navbar;
