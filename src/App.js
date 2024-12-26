


import React, { useReducer, useEffect } from 'react';
import { init } from '@instantdb/react';
import ContactList from './components/ContactList';
import ChatWindow from './components/ChatWindow';
import { AppContext } from './context/AppContext';
import { reducer, initialState } from '../src/reducers/appReducer';
import { useIndexedDB } from './hooks/useIndexedDB';
import './App.css';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { initDB, getMessages, saveMessage } = useIndexedDB();

  useEffect(() => {
    const instantDB = init({ appId: '7fcc6f82-c2ce-4fcc-a6e1-bd1fc9a09b66' });
    initDB();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, getMessages, saveMessage }}>
      <div className="app-container">
        <ContactList />
        <ChatWindow />
      </div>
    </AppContext.Provider>
  );
};

export default App;