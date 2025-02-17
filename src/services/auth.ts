import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    await AsyncStorage.setItem("userToken", userCredential.user.uid); // Save user ID as token
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("registered");
    await AsyncStorage.setItem("userToken", userCredential.user.uid); // Save user ID as token
    return userCredential.user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const checkLoginStatus = async () => {
  try {
    const userToken = await AsyncStorage.getItem("userToken");
    return userToken !== null; // Return true if token exists
  } catch (error: any) {
    throw new Error(error.message);
  }
};
