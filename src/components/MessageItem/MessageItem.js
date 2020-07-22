import React from "react";
import "./MessageItem.css";

const MessageItem = (props) => {
  const { messageItem, isMyMessage } = props;
  const { time, from, message } = messageItem;

  const messageClass = ['message-row'];
  if (isMyMessage) {
    messageClass.push('you-message');
  } else {
    messageClass.push('other-message');
  }

  const userName = isMyMessage ? null : <p className='message-name'>{from}</p>;

  const date = new Date(time);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const newTime = `${hours}:${minutes}`;

  return (
    <div className={messageClass.join(' ')}>
      <div className="message-content">
        {userName}
        <div className="message-text">
          {message}
        </div>
        <div className="message-time">{newTime}</div>
      </div>
    </div>
  )
};

export default MessageItem
