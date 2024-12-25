import React from 'react';

const Message = ({ message }) => (
  <div className={`message ${message.isSent ? 'sent' : 'received'}`}>
    <div className="message-content">
      <p>{message.text}</p>
      <span className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
    </div>
  </div>
);

export default Message;