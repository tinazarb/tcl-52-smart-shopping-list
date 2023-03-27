import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { config } from '../../secrets';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: config.FIREBASE_API_KEY,
	authDomain: config.FIREBASE_AUTH_DOMAIN,
	projectId: config.FIREBASE_PROJECT_ID,
	storageBucket: config.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
	appId: config.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
