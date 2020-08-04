import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {setName} from "../../redux/actions";
import "./Join.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

class Join extends Component {
  state = {
    isError: false,
    errorMessage: ' ',
    errorType: '',
  };
  inputRef = React.createRef();

  singInHandler = (e) => {
    if (!this.props.name) {
      e.preventDefault();
      this.setState({
        isError: true,
        errorMessage: 'Name can not be empty',
        errorType: 'error',
      })
    } else if (this.props.name.length < 4) {
      e.preventDefault();
      this.setState({
        isError: true,
        errorMessage: 'Name is too short',
        errorType: 'warning',
      })
    }
  };

  setNameHandler = (name) => {
    if (name.length < 4){
      this.setState({
        errorMessage: 'Name is too short',
        errorType: 'warning',
      });
    } else {
      this.setState({
        errorMessage: 'Name is acceptable',
        errorType: 'info',
      });
      localStorage.setItem('from', name);
    }
    this.props.changeName(name);
  };

  render() {
    const isError = this.state.isError;
    return (
      <div className="join">
        <h1>Join</h1>
        <input placeholder="Name" type="text"
               value={this.props.name}
               onChange={(e) => this.setNameHandler(e.target.value)}
               ref={this.inputRef}
        />
        {isError
          ? <ErrorMessage message={this.state.errorMessage} type={this.state.errorType}/>
          : null
        }
        <Link onClick={this.singInHandler} to={'/chat'}>
          <button type="submit">Sign In</button>
        </Link>
      </div>
    )
  }

  componentDidMount() {
    this.inputRef.current.focus();
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

