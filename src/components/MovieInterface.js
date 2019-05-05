import React, {Component} from 'react';
import '../css/movieInterface.css';
import { FaEye } from 'react-icons/fa';
import { FaBan } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { IconContext } from "react-icons";


class MovieInterface extends Component {
    
    state = {
        banned: false
    }
    
    deActivateButtonAddMovieSeen = () => {
        let user_id = this.props.user.id;
        let movie_id = this.props.movie.id;
        this.props.addMovieAsSeen(user_id, movie_id);
        // this.setState({ seen: [this.props.movie, ...this.props.seenMovies]})
    }

    deActivateButtonAddMovieMustSee = () => {
        let user_id = this.props.user.id;
        let movie_id = this.props.movie.id;
        this.props.addMovieAsMustSee(user_id, movie_id);
        // this.setState({ interests: [this.props.movie, ...this.props.mustSeeMovies]})
    }


    

    render() {
        let user_id = this.props.user.id;
        let movie_code = this.props.movie.ref_code;
        let findMustSeeMovie = [];
        let findSeenMovie = [];
        console.log("MovieInterface seenMovies: ", this.props.mustSeeMovies);
        console.log("MovieInterface mustSeeMovies: ", this.props.mustSeeMovies);

        

        // Check if movie has already been added as a seen movie
        if (this.props.seenMovies && this.props.seenMovies.length !== 0) {
            findSeenMovie = this.props.seenMovies.filter(movie => movie_code === movie.ref_code);
            
        } 

        // Check if movie has already been added as a movie of interest
        if (this.props.mustSeeMovies && this.props.mustSeeMovies.length !== 0) {
            findMustSeeMovie = this.props.mustSeeMovies.filter(movie => movie_code === movie.ref_code);
            console.log("Movie Matched: ", findMustSeeMovie.length, "Movie Code: ", movie_code);
        } 
        if (this.state.banned) {

            return (
                <div className="controls" >
                    <div className="interface">
                        <h2>Not Worth Seeing!</h2>
                    </div>
                </div>
            )

        } else {

            return (
                
                <div className="controls" >
                    <div className="interface">

                        <div className="seen">
                            {findSeenMovie.length === 0 ?
                            <div onClick={this.deActivateButtonAddMovieSeen} className="rollover" alt="Seen This">
                                <IconContext.Provider value={{ style: { width: '60%', color: 'white', paddingTop: '16.5%'} }}>
                                    <FaEye/>
                                </IconContext.Provider> 
                            </div>
                            :
                            <div alt="Seen This">
                                <h3 className="seen-message">SEEN</h3> 
                            </div>
                            }

                        </div>

                        {findSeenMovie.length === 0 ?  
                            <div className="interested">Wanna See This?</div>
                        :
                            <div className="interested"></div>
                        }
                        
                            <div className="yay">
                                {findSeenMovie.length === 0 && findMustSeeMovie.length === 0 ?
                                <div onClick={this.deActivateButtonAddMovieMustSee} className="rollover">
                                    <IconContext.Provider value={{ style: { width: '32%', color: 'white', paddingTop: '15%'} }}>
                                        <FaCheck/>
                                    </IconContext.Provider>
                                </div>
                                :
                                <div className="deactivated">
                                    <IconContext.Provider value={{ style: { width: '32%', color: 'white', paddingTop: '15%' } }}>
                                        <FaCheck/>
                                    </IconContext.Provider>
                                </div>
                                }

                            </div>

                            <div id="Nay" className="nay">
                            {findSeenMovie.length === 0 ?
                                <div onClick={() => this.setState({ banned: !this.state.banned })} className="rollover">
                                    <IconContext.Provider value={{ style: { width: '32%', color: 'white', paddingTop: '15%'} }}>
                                        <FaBan/>
                                    </IconContext.Provider> 
                                </div>
                                :
                                <div className="deactivated">
                                    <IconContext.Provider value={{ style: { width: '32%', color: 'white', paddingTop: '15%'} }}>
                                        <FaBan/>
                                    </IconContext.Provider> 
                                </div>
                            }
                            </div>
                    </div>
                
                </div>



            )
        }
    }







}

export default MovieInterface;