import React from "react";
import {Link} from 'react-router-dom';

class Login extends React.Component {
  state = {
    name: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.submitHandler(this.state);
  };
  render() {
    const {name} = this.props
    return (
      <div id="right-col" className="uk-tile-muted uk-padding-large uk-height-viewport login-box">
        <form onSubmit={this.submitHandler}>
          <legend className="uk-legend">Please {name}</legend>
          <input
            className="uk-input"
            type="text"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.changeHandler}
          />
          <input
            className="uk-input"
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
          <button
          className="uk-button"
          >
          {name}</button>
          <br/>
          {name === "Login"
            ? <span className="uk-link-muted"><Link to="/signup">I Don't Have An Account</Link></span>
            : <span className="uk-link-muted"><Link to="/login">I Have An Account Already</Link></span>
          }
        </form>
      </div>
    );
  }
}

export default Login;
