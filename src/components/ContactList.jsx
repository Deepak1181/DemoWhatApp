import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ContactList = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleContactSelect = (contact) => {
    dispatch({ type: 'SELECT_CONTACT', payload: contact });
  };

  return (
    <div className="contact-list">
      {state.contacts.map(contact => (
        <div
          key={contact.id}
          className={`contact-item ${state.selectedContact?.id === contact.id ? 'selected' : ''}`}
          onClick={() => handleContactSelect(contact)}
        >
          <img src={contact.avatar} alt={contact.name} className="avatar" />
          <div className="contact-info">
            <h3>{contact.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;