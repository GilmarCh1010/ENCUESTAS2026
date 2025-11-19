import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// NOTE: In a production Vercel environment, these should be environment variables.
// process.env.REACT_APP_FIREBASE_API_KEY, etc.
// Keeping hardcoded values as per user's original code structure request.
const firebaseConfig = {
    apiKey: "AIzaSyB7tKe35ifUgv8_0bH5t5W5mWvYYOUR_API_KEY", // Placeholder from original code
    databaseURL: "https://profesores-encuesta-2025-default-rtdb.firebaseio.com",
    projectId: "profesores-encuesta-2025"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);