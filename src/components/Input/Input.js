import React, {Component} from 'react';
import {connect} from 'react-redux';

import './Input.css'

class Input extends Component {
  state = {
    message: ''
  };

  setMessage = (value) => {
    this.setState({
      message: value
    })
  };

  messageSend() {
    if (this.state.message) {
      this.props.socket.send(JSON.stringify({ from: this.props.name, message: this.state.message }));
      this.setState({
        message: ''
      })
    }
  };

  render() {
    return (
      <div className="input">
        <input
          className="input-text"
          type="text"
          placeholder="Type a message..."
          value={this.state.message}
          onChange={(e) => this.setMessage(e.target.value)}
          onKeyPress={e => e.key === 'Enter' ? this.messageSend(e) : null}
        />
        <button className="input-button" onClick={e => this.messageSend(e)}>Send</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    name: state.name,
    socket: state.socket,
  }
}

export default connect(mapStateToProps)(Input);
