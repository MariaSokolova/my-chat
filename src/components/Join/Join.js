import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {setName} from "../../redux/actions";
import "./Join.css";

class Join extends Component {
  singInHandler = (e) => {
    if (!this.props.name) {
      e.preventDefault();
    } else {
      return null;
    }
  };

  setNameHandler(name) {
    this.props.changeName(name);
    localStorage.setItem('from', name);
  };

  render() {
    return (
      <div className="join">
        <h1>Join</h1>
        <input placeholder="Name" type="text"
               value={this.props.name}
               onChange={(e) => this.setNameHandler(e.target.value)}/>
        <Link onClick={this.singInHandler} to={'/chat'}>
          <button type="submit">Sign In</button>
        </Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    name: state.name
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeName: name => dispatch(setName(name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join)
