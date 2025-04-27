import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDCRtUMI7ChXJb6BK80QI_SScVFAv4QzSY",
    authDomain: "task-manager-7695b.firebaseapp.com",
    projectId: "task-manager-7695b",
    storageBucket: "task-manager-7695b.firebasestorage.app",
    messagingSenderId: "681020097920",
    appId: "1:681020097920:web:504ef4d93152e270ac6d65",
    measurementId: "G-86NG6NSZ4E"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;