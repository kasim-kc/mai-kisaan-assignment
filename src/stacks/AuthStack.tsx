import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../screens/sign-up";
import SignInScreen from "../screens/sign-in";
import HomeScreen from "../screens/Home";
import MainStack from "./MainStack";
import React from "react";

const authStack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <authStack.Navigator
      initialRouteName="SignUp"
      screenOptions={{ headerShown: false }}
    >
      <authStack.Screen name="SignUp" component={SignUpScreen} />
      <authStack.Screen name="SignIn" component={SignInScreen} />
      <authStack.Screen name="Main" component={MainStack} />
    </authStack.Navigator>
  );
};

export default AuthStack;
