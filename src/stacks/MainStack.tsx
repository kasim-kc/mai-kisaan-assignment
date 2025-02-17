import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainStackParamList } from "./types";
import HomeScreen from "../screens/Home";
import DetailsScreen from "../screens/Details";
import LanguageScreen from "../screens/Language";
import React from "react";

const mainStack = createNativeStackNavigator<MainStackParamList>();
const MainStack = () => {
  return (
    <mainStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <mainStack.Screen name="Home" component={HomeScreen} />
      <mainStack.Screen name="Details" component={DetailsScreen} />
      <mainStack.Screen name="Language" component={LanguageScreen} />
    </mainStack.Navigator>
  );
};

export default MainStack;
