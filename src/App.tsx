import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import "../global.css";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { images } from "../constants";
import CustomButton from "./components/CustomButton";
import { StatusBar } from "expo-status-bar";
import SignUpScreen from "./screens/sign-up";
import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";
import { AuthProvider } from "./context/AuthContext";

SplashScreen.preventAutoHideAsync();

function OnBoardScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4 bg-[#212529]">
          <Image
            source={images.logo}
            className="w-[170px] h-[280px] mb-0"
            resizeMode="contain"
          />
          <Text className="text-3xl text-white font-bold text-center mb-2">
            Let's Start with{" "}
            <View className="animate-pulse mt-1.5">
              <Text className="text-[#a8d5a8] text-3xl font-bold text-center">
                Assignment
              </Text>
            </View>
          </Text>
          <CustomButton
            title="Authenticate Yourself"
            handlePress={() => {
              navigation.navigate("auth");
            }}
            containerStyles="w-full mt-7"
            isLoading={false}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

const RootStack = createNativeStackNavigator();

export function App() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }

    // if (!fontsLoaded && !error) {
    //   return null;
    // }
  }, [fontsLoaded, error]);

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="OnBoard"
          // screenOptions={{ headerShown: false }}
        >
          <RootStack.Screen
            name="OnBoard"
            component={OnBoardScreen}
            options={{
              title: "Landing Page",
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="auth"
            component={AuthStack}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="main"
            component={MainStack}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
