import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import {connect} from "react-redux";

import {setName} from "../../redux/actions";
import MessageItem from "../MessageItem/MessageItem";
import './MessageList.css'

const MessageList = (props) => {
   return (
    <ScrollToBottom className='message-list'>
      {props.messages.map((message, id) => {
        return (
          <MessageItem key={id} messageItem={message} isMyMessage={message.from === props.name}/>
        )
      }).reverse()}
    </ScrollToBottom>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
