// import { useCallback } from 'react';

// export const useIndexedDB = () => {
//   const openDB = () => {
//     return new Promise((resolve, reject) => {
//       const request = indexedDB.open('whatsappClone', 1);
//       request.onerror = () => reject(request.error);
//       request.onsuccess = () => resolve(request.result);
//     });
//   };

//   const initDB = useCallback(() => {
//     const request = indexedDB.open('whatsappClone', 1);
    
//     request.onerror = (event) => {
//       console.error('IndexedDB error:', event.target.error);
//     };

//     request.onupgradeneeded = (event) => {
//       const db = event.target.result;
//       if (!db.objectStoreNames.contains('messages')) {
//         const store = db.createObjectStore('messages', { keyPath: 'id', autoIncrement: true });
//         store.createIndex('contactId', 'contactId', { unique: false });
//       }
//     };
//   }, []);

//   const saveMessage = useCallback(async (message) => {
//     try {
//       const db = await openDB();
//       const transaction = db.transaction(['messages'], 'readwrite');
//       const store = transaction.objectStore('messages');
//       return store.add(message);
//     } catch (error) {
//       console.error('Error saving message:', error);
//       return null;
//     }
//   }, []);

//   const getMessages = useCallback(async (contactId) => {
//     try {
//       const db = await openDB();
//       const transaction = db.transaction(['messages'], 'readonly');
//       const store = transaction.objectStore('messages');
//       const index = store.index('contactId');
//       const request = index.getAll(contactId);
      
//       return new Promise((resolve, reject) => {
//         request.onsuccess = () => resolve(request.result || []);
//         request.onerror = () => reject(request.error);
//       });
//     } catch (error) {
//       console.error('Error getting messages:', error);
//       return [];
//     }
//   }, []);

//   return { initDB, saveMessage, getMessages };
// };










import { useCallback } from 'react';

export const useIndexedDB = () => {
  const DB_NAME = 'whatsappClone';
  const STORE_NAME = 'messages';
  const DB_VERSION = 1;

  const openDB = () => {
    return new Promise((resolve, reject) => {
      console.log('Opening IndexedDB...'); // Debug log
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = (event) => {
        console.error('Error opening DB:', event.target.error);
        reject(request.error);
      };
      
      request.onsuccess = (event) => {
        console.log('DB opened successfully'); // Debug log
        resolve(event.target.result);
      };
      
      request.onupgradeneeded = (event) => {
        console.log('Upgrading DB...'); // Debug log
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { 
            keyPath: 'id',
            autoIncrement: true 
          });
          store.createIndex('contactId', 'contactId', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          console.log('Store created'); // Debug log
        }
      };
    });
  };

  const initDB = useCallback(async () => {
    try {
      await openDB();
      console.log('DB initialized successfully'); // Debug log
    } catch (error) {
      console.error('Error initializing DB:', error);
    }
  }, []);

  const saveMessage = useCallback(async (message) => {
    console.log('Attempting to save message:', message); // Debug log
    
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        const request = store.add(message);
        
        request.onsuccess = () => {
          const savedMessage = { ...message, id: request.result };
          console.log('Message saved successfully:', savedMessage); // Debug log
          resolve(savedMessage);
        };
        
        request.onerror = () => {
          console.error('Error in request:', request.error);
          reject(request.error);
        };

        transaction.oncomplete = () => {
          console.log('Transaction completed'); // Debug log
        };
      });
    } catch (error) {
      console.error('Error saving message:', error);
      return null;
    }
  }, []);

  const getMessages = useCallback(async (contactId) => {
    console.log('Fetching messages for contact:', contactId); // Debug log
    
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index('contactId');
        
        const request = index.getAll(contactId);
        
        request.onsuccess = () => {
          const messages = request.result || [];
          messages.sort((a, b) => a.timestamp - b.timestamp);
          console.log('Retrieved messages:', messages); // Debug log
          resolve(messages);
        };
        
        request.onerror = () => {
          console.error('Error in request:', request.error);
          reject(request.error);
        };
      });
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  }, []);

  return { initDB, saveMessage, getMessages };
};
