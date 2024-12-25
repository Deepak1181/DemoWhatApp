







import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import MessageInput from './MessageInput';
import Message from './Message';

const ChatWindow = () => {
  const { state, dispatch, getMessages } = useContext(AppContext);

  useEffect(() => {
    if (state.selectedContact) {
      const loadMessages = async () => {
        try {
          const messages = await getMessages(state.selectedContact.id);
          dispatch({ type: 'SET_MESSAGES', payload: messages });
        } catch (error) {
          console.error('Error loading messages:', error);
          dispatch({ type: 'SET_MESSAGES', payload: [] });
        }
      };
      loadMessages();
    }
  }, [state.selectedContact, getMessages, dispatch]);

  if (!state.selectedContact) {
    return <div className="chat-window empty">Select a contact to start chatting</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={state.selectedContact.avatar} alt={state.selectedContact.name} className="avatar" />
        <h2>{state.selectedContact.name}</h2>
      </div>
      <div className="messages-container">
        {state.currentMessages.map(message => (
          <Message key={message.id || message.timestamp} message={message} />
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatWindow;