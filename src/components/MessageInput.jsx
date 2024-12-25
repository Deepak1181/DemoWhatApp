






import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { state, dispatch, saveMessage } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    console.log('Sending message:', message); // Debug log

    const newMessage = {
      text: message.trim(),
      contactId: state.selectedContact.id,
      timestamp: Date.now(),
      isSent: true
    };
    
    console.log('Created message object:', newMessage); // Debug log

    try {
      const savedMessage = await saveMessage(newMessage);
      console.log('Message saved to IndexedDB:', savedMessage); // Debug log
      
      if (savedMessage) {
        dispatch({ type: 'ADD_MESSAGE', payload: savedMessage });
        console.log('Message added to state:', savedMessage); // Debug log
        setMessage('');
      }
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;