import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Textbox} from "react-inputs-validation";


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
        <Textbox
          attributesInput={{ // Optional.
            id: 'Name',
            name: 'Name',
            type: 'text',
            placeholder: 'Place your name here...',
          }}
          value={this.props.name} // Optional.[String].Default: "".
          onChange={(name) => {
            this.setNameHandler(name);
          }}
          onFocus={true}
          onBlur={(e) => {
            console.log(e)
          }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
          validationOption={{
            name: 'Name',
            check: true,
            required: true
          }}
        />
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
