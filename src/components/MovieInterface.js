import React, {Component} from 'react';
import '../css/movieInterface.css';
import { FaEye } from 'react-icons/fa';
import { FaBan } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { IconContext } from "react-icons";


class MovieInterface extends Component {
    

    

    render() {
        let user_id = this.props.user.id;
        let movie_id = this.props.movie.id;
        
        
        
        return (

            <div className="controls" >
                <div className="interface">

                    <div className="seen">
                        <div onClick={(e) => this.props.addMovieAsSeen(e, user_id, movie_id)} className="rollover" alt="Seen This">
                            <IconContext.Provider value={{ style: { width: '60%', color: 'white', paddingTop: '16.5%'} }}>
                                <FaEye/>
                            </IconContext.Provider> 
                        </div>
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