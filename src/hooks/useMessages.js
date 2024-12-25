// import { useCallback, useContext } from 'react';
// import { AppContext } from '../context/AppContext';

// export const useMessages = () => {
//   const { state, dispatch } = useContext(AppContext);

//   const loadMessagesForContact = useCallback(async (contactId) => {
//     // Load from LocalStorage
//     const storedMessages = localStorage.getItem(`messages-${contactId}`);
//     const messages = storedMessages ? JSON.parse(storedMessages) : [];
    
//     dispatch({
//       type: 'LOAD_MESSAGES',
//       payload: { contactId, messages }
//     });
//   }, [dispatch]);

//   const saveMessage = useCallback(async (message) => {
//     const contactId = message.contactId;
//     const storedMessages = localStorage.getItem(`messages-${contactId}`);
//     const messages = storedMessages ? JSON.parse(storedMessages) : [];
    
//     const newMessage = {
//       ...message,
//       id: Date.now() // Simple ID generation
//     };
    
//     const updatedMessages = [...messages, newMessage];
//     localStorage.setItem(`messages-${contactId}`, JSON.stringify(updatedMessages));
    
//     dispatch({
//       type: 'ADD_MESSAGE',
//       payload: newMessage
//     });
    
//     return newMessage;
//   }, [dispatch]);

//   return { loadMessagesForContact, saveMessage };
// };
