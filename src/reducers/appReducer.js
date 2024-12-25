
// export const initialState = {
//     contacts: [
//       { id: 1, name: 'Harsh', avatar: 'https://imgs.search.brave.com/FuucHINHsw5aJkqp22zu2s49UYr6opV9YKOM3PkHe7M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzM2Lzg2Lzkx/LzM2MF9GXzgzNjg2/OTEzMl9RdGR3bzI1/WHRtTTJabUtXR0Jk/ZU5pWVNYOUxaWlZQ/aC5qcGc' },
//       { id: 2, name: 'Rohit', avatar: 'https://imgs.search.brave.com/FuucHINHsw5aJkqp22zu2s49UYr6opV9YKOM3PkHe7M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzM2Lzg2Lzkx/LzM2MF9GXzgzNjg2/OTEzMl9RdGR3bzI1/WHRtTTJabUtXR0Jk/ZU5pWVNYOUxaWlZQ/aC5qcGc' },
//       { id: 3, name: 'Saurav', avatar: 'https://imgs.search.brave.com/FuucHINHsw5aJkqp22zu2s49UYr6opV9YKOM3PkHe7M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzM2Lzg2Lzkx/LzM2MF9GXzgzNjg2/OTEzMl9RdGR3bzI1/WHRtTTJabUtXR0Jk/ZU5pWVNYOUxaWlZQ/aC5qcGc' },
//       { id: 4, name: 'Sumit', avatar: 'https://imgs.search.brave.com/FuucHINHsw5aJkqp22zu2s49UYr6opV9YKOM3PkHe7M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzM2Lzg2Lzkx/LzM2MF9GXzgzNjg2/OTEzMl9RdGR3bzI1/WHRtTTJabUtXR0Jk/ZU5pWVNYOUxaWlZQ/aC5qcGc' }
//     ],
//     selectedContact: null,
//     messages: []
//   };
  
//   export const reducer = (state, action) => {
//     switch (action.type) {
//       case 'SELECT_CONTACT':
//         return {
//           ...state,
//           selectedContact: action.payload,
//           messages: [] 
//         };
        
//       case 'SET_MESSAGES':
//         return {
//           ...state,
//           messages: action.payload
//         };
        
//       case 'ADD_MESSAGE':
//         return {
//           ...state,
//           messages: [...state.messages, action.payload]
//         };
        
//       case 'UPDATE_MESSAGE':
//         return {
//           ...state,
//           messages: state.messages.map(message =>
//             message.id === action.payload.id ? action.payload : message
//           )
//         };
        
//       case 'DELETE_MESSAGE':
//         return {
//           ...state,
//           messages: state.messages.filter(message => message.id !== action.payload)
//         };
        
//       default:
//         return state;
//     }
//   };






export const initialState = {
    contacts: [
        { id: 1, name: 'Ayushi', avatar: 'https://imgs.search.brave.com/1k8fyzyQ6xR46fc4pHxQ68PHxAW33we2bqcaMNFIQRc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9waG90/b3NidXp6Lm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvY3V0ZS1n/aXJsLXBpYzI3Lmpw/Zw' },
      { id: 2, name: 'Deepak', avatar: 'https://imgs.search.brave.com/M6QN0DciFPhSPSmZwEbGlSy4nJcBni5gNcAhUNp7Uu8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvYW5pbWUtYm95/LXBpY3R1cmVzLWlr/b2Eyb3Q1NTNtdjU4/aGYuanBn' },
      { id: 3, name: 'Upendra', avatar: 'https://imgs.search.brave.com/oKMMloi21wWJ_7ok3hha2uJeHTgR0Yc_AmpOwkvEM7I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvYm95/LTkwMC14LTE1OTkt/cGljdHVyZS1nb3Jp/eXl4dWRrcTBtZTZx/LmpwZw' },
      { id: 4, name: 'Veeru', avatar: 'https://imgs.search.brave.com/FuucHINHsw5aJkqp22zu2s49UYr6opV9YKOM3PkHe7M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzM2Lzg2Lzkx/LzM2MF9GXzgzNjg2/OTEzMl9RdGR3bzI1/WHRtTTJabUtXR0Jk/ZU5pWVNYOUxaWlZQ/aC5qcGc' }
    ],
    selectedContact: null,
    allMessages: {}, // Store all messages by contactId
    currentMessages: [] // Messages for current view
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case 'SELECT_CONTACT':
        return {
          ...state,
          selectedContact: action.payload,
          currentMessages: state.allMessages[action.payload.id] || []
        };
        
      case 'LOAD_MESSAGES':
        return {
          ...state,
          allMessages: {
            ...state.allMessages,
            [action.payload.contactId]: action.payload.messages
          },
          currentMessages: state.selectedContact?.id === action.payload.contactId 
            ? action.payload.messages 
            : state.currentMessages
        };
        
      case 'ADD_MESSAGE':
        const contactId = action.payload.contactId;
        const updatedMessages = [
          ...(state.allMessages[contactId] || []),
          action.payload
        ];
        
        return {
          ...state,
          allMessages: {
            ...state.allMessages,
            [contactId]: updatedMessages
          },
          currentMessages: state.selectedContact?.id === contactId 
            ? updatedMessages 
            : state.currentMessages
        };
        
      default:
        return state;
    }
  };
  