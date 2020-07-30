import React, {Component} from "react";
import './ErrorMessage.css'

class ErrorMessage extends Component {
  state = {
    count: 20
  };

  render () {
    const count = this.state.count;
    return (
      <div className="error-message">
        <p>Please check your internet connection. Reconnection will start in a {count} seconds</p>
      </div>
    )
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      this.setState(prevState => ({
        count: prevState.count - 1
      }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }
}

export default ErrorMessage
