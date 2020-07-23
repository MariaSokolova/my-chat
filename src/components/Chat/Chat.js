import React, {Component} from "react";
import {connect} from 'react-redux';

import Input from "../Input/Input";
import MessageList from "../MessageList/MessageList";
import Header from "../Header/Header";
import {setSocket} from "../../redux/actions";

import "./Chat.css"

class Chat extends Component {
  constructor(props) {
    super(props);
    this.messagesFormStorage = JSON.parse(localStorage.getItem('messages'));
    this.state = {
      messages: this.messagesFormStorage || [],
      isOnline: false,
      windowIsActive: true
    };
  }

  onFocus = () => {
    this.setState( {
        windowIsActive: true
    })
  };

  onBlur = () => {
    this.setState({
        windowIsActive: false
    });
  };

  componentDidMount() {
    this.startWebSocket();
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }

    window.addEventListener('focus', this.onFocus);
    window.addEventListener('blur', this.onBlur);
  }

  startWebSocket() {
    const restartWebSocket = () => {
      if (this.socket) {
        this.socket.close();
      }
      this.startWebSocket();
      console.log('server restarted')
    };

    this.socket = new WebSocket("ws://chat.shas.tel");

    this.socket.onopen = function (e) {
      console.log("[open] Connection established");
    };

    this.socket.onmessage = (event) => {
      const newMessages = JSON.parse(event.data);

      if (!this.state.windowIsActive && newMessages.length !== 0) {
        this.showNotification(newMessages[0].from, { body: newMessages[0].message });
      }

      this.setState((prevState) => {
        if (prevState.isOnline) {
          const messages = [...newMessages, ...prevState.messages];

          localStorage.setItem('messages', JSON.stringify(messages));
          return {
            messages: messages
          }
        } else {
          const messages = [...newMessages];
          localStorage.setItem('messages', JSON.stringify(messages));
          return {
            messages: messages,
            isOnline: true
          }
        }
      });

      this.props.setSocket(this.socket);
    };

    this.socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.log('[close] Connection died');
        setTimeout(() => restartWebSocket(), 8000)
      }
    };
    this.socket.onerror = function (error) {
      console.log(`[error] ${error.message}`);
    };
  }

  showNotification(from, options) {
    const n = new Notification(from, options);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        n.close();
      }
    })
  }

  componentWillUnmount() {
    this.disconnectHandler();
    window.removeEventListener('focus', this.onFocus);
    window.removeEventListener('blur', this.onBlur);
  }

  disconnectHandler() {
    if (this.socket) {
      this.socket.close();
    }
    console.log('disconnect 2');
    this.socket = null;
    this.props.setSocket(null);
  }

  render() {
    return (
      <div className='chat'>
        <Header/>
        <MessageList messages={this.state.messages}/>
        <Input />
      </div>
    )
  };
}

function mapStateToProps(state) {
  return {
    name: state.name,
    socket: state.socket,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSocket: socket => dispatch(setSocket(socket))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
