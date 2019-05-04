import React, {Component} from 'react';
import '../css/movieInterface.css';
import { FaEye } from 'react-icons/fa';
import { FaBan } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { IconContext } from "react-icons";


class MovieInterface extends Component {
    
    state = {
        seen: []
    }
    
    deActivateButtonAddMovie = () => {
        let user_id = this.props.user.id;
        let movie_id = this.props.movie.id;
        this.props.addMovieAsSeen(user_id, movie_id);
        this.setState({ seen: [this.props.movie, ...this.props.seenMovies]})
    }


    componentDidMount = () => {
        // let token = localStorage.token;
        // fetch("http://localhost:3000/api/v1/views", {
        //     method: "GET",
        //     headers: {
        //       "content-type": "application/json",
        //       accepts: "application/json",
        //       Authorization: `Bearer ${token}`
        //     }
        //   })
        //     .then(resp => resp.json())
        //     .then(data => console.log("view fetch: ", data))
        console.log("MovieInterface fetch")
    }

    render() {
        let user_id = this.props.user.id;
        let movie_code = this.props.movie.ref_code;
        let findMovie = [];

        console.log("MovieInterface seenMovies: ", this.props.seenMovies);

        
        if (this.props.seenMovies.length === 0) {
            console.log("No Movies: ", findMovie);
        } else {
            
            findMovie = this.props.seenMovies.filter(movie => movie_code === movie.ref_code);
            console.log("Movie Matched: ", findMovie.length, "Movie Code: ", movie_code);
        }

        return (
            
            
            <div className="controls" >
                <div className="interface">

                    <div className="seen">
                        {findMovie.length === 0 ?
                        <div onClick={this.deActivateButtonAddMovie} className="rollover" alt="Seen This">
                            <IconContext.Provider value={{ style: { width: '60%', color: 'white', paddingTop: '16.5%'} }}>
                                <FaEye/>
                            </IconContext.Provider> 
                        </div>
                        :
                        <div alt="Seen This">
                            <h3 className="seen-message">SEEN</h3> 
                        </div>}


                    </div>

                    <div className="interested">Wanna See This?</div>
                    
                        <div className="yay">
                            <div className="rollover">
                                <IconContext.Provider value={{ style: { width: '32%', color: 'white', paddingTop: '15%'} }}>
                                    <FaCheck/>
                                </IconContext.Provider>
                            </div>
                        </div>

                        <div id="Nay" className="nay">
                            <div className="rollover">
                                <IconContext.Provider value={{ style: { width: '32%', color: 'white', paddingTop: '15%'} }}>
                                    <FaBan/>
                                </IconContext.Provider> 
                            </div>
                        </div>
                </div>
            
            </div>



        )
    }







}

export default MovieInterface;