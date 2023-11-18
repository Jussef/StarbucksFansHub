// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAs5SSPLKN0snXC01DvVD8merjtqYt9w7I",
	authDomain: "dashboard-inversiones-ahorro.firebaseapp.com",
	projectId: "dashboard-inversiones-ahorro",
	storageBucket: "dashboard-inversiones-ahorro.appspot.com",
	messagingSenderId: "554734240524",
	appId: "1:554734240524:web:1fea1db14a641c4a98bf29"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
