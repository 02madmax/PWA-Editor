import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    // opens the database with version 1
    const db = await openDB('jate', 1);
    // opens a new transaction with the database for read and writing data
    const tx = db.transaction('jate', 'readwrite');
    // opens the store
    const store = tx.objectStore('jate');
    // puts the content in the store
    await store.put(content);
    // waits for the transaction to complete due to promise based API
    await tx.done;
    console.log('putDb successful');
  } catch (error) {
    console.error('putDb failed', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database

export const getDb = async () => {
  try {
    // opens the database
    const db = await openDB('jate', 1)
    // opens a transaction
    const tx = db.transaction('jate', 'readonly');
    // opens the store
    const store = tx.objectStore('jate');
    // retrieves all content from the store
    const content = await store.getAll();
    //return fetched content
    return content;
  } catch (error) {
    console.error('getDb failed', error);
  }
}
initdb();
