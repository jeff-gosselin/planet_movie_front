import React from 'react';
import {Link} from 'react-router-dom';



const Search = (props) => {

  
  return (
    <nav className="uk-navbar-container z" data-uk-navbar>

      <div className="nav-overlay uk-navbar-left">

          <a className="margin-large-right uk-navbar-toggle" uk-icon="icon: search" uk-toggle="target: .nav-overlay; animation: uk-animation-fade"></a>

      </div>

      <div className="nav-overlay uk-navbar-left uk-flex-1" hidden={true}>

          <div className="uk-navbar-item uk-width-xlarge">
              <form className="uk-search uk-search-navbar uk-width-1-1">
                  <input
                    className="uk-search-input"
                    name="search"
                    type="search"
                    placeholder="Search..."
                    autoFocus={true}
                    value={props.searchTerm}
                    onChange={props.filterMovies} />
              </form>
          </div>

          <a className="uk-navbar-toggle uk-padding-large uk-padding-remove-top uk-padding-remove-bottom" data-uk-close uk-toggle="target: .nav-overlay; animation: uk-animation-fade"></a>

      </div>

    <div className="nav-overlay uk-navbar-left">
       
       {props.user.id ? 
        <ul className="uk-navbar-nav">
          <li className="uk-active pointer" onClick={() => props.logout()}>Log Out</li> 
        </ul>
        :
        <ul className="uk-navbar-nav">
          <li className="uk-active pointer"><Link to="/login">Log In</Link></li>
          <li className="pointer"><Link to="/signup">Sign Up</Link></li>
        </ul>
        }
           
       

   </div>

</nav>
  )
}

export default Search;
