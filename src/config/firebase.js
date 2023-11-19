// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAdRgQyJ_heGzbx0mwyFQIWjwADJvRjgs4",
	authDomain: "starbucksfanshub.firebaseapp.com",
	projectId: "starbucksfanshub",
	storageBucket: "starbucksfanshub.appspot.com",
	messagingSenderId: "285395305539",
	appId: "1:285395305539:web:f538548645d3b49c29c0f6",
	measurementId: "G-RVGTCGGCZV"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
