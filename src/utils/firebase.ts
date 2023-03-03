import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'the-collection-storage.firebaseapp.com',
  projectId: 'the-collection-storage',
  storageBucket: 'the-collection-storage.appspot.com',
  messagingSenderId: '597052524397',
  appId: '1:597052524397:web:7930af9e50d46aeaf3bc64',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
