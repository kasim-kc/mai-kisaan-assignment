import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1UsXXdMSAMgnzZumuGglt7lPdHJLuNcM",
  authDomain: "mai-kisaan-157a1.firebaseapp.com",
  projectId: "mai-kisaan-157a1",
  storageBucket: "mai-kisaan-157a1.firebasestorage.app",
  messagingSenderId: "537071853386",
  appId: "1:537071853386:web:58415f9f9b870e0185ebb3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
