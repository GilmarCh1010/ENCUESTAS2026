import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// NOTE: In a production Vercel environment, these should be environment variables.
// process.env.REACT_APP_FIREBASE_API_KEY, etc.
// Keeping hardcoded values as per user's original code structure request.
const firebaseConfig = {
    apiKey: "AIzaSyB7tKe35ifUgv8_0bH5t5W5mWvYYOUR_API_KEY", // Placeholder from original code
    databaseURL: "https://profesores-encuesta-2025-default-rtdb.firebaseio.com",
    projectId: "profesores-encuesta-2025"
};

// Initialize Firebase (check if already initialized)
const app = !firebase.apps.length 
    ? firebase.initializeApp(firebaseConfig) 
    : firebase.app();

export const database = app.database();