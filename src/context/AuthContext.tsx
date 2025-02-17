import React, { createContext, useState, useEffect } from "react";
import { checkLoginStatus } from "../services/auth";
import { auth } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

// type AuthContextType = {
//   isLoggedIn: boolean;
//   setIsLoggedIn: (loggedIn: boolean) => void;
//   logout: () => Promise<void>;
// };

// const defaultAuthContext: AuthContextType = {
//   isLoggedIn: false,
//   setIsLoggedIn: () => {},
//   logout: async () => {},
// };

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (loggedIn: boolean) => {},
  logout: async () => {},
});
// export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const verifyLoginStatus = async () => {
      const loggedIn = await checkLoginStatus();
      setIsLoggedIn(loggedIn);
    };
    verifyLoginStatus();
  }, []);

  // const logout = async () => {
  //   await logoutUser();
  //   setIsLoggedIn(false);
  //   navigation.navigate('Login');
  // };

  const logout = async () => {
    try {
      await auth.signOut(); // Sign out from Firebase
      await AsyncStorage.removeItem("userToken");
      setIsLoggedIn(false);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
