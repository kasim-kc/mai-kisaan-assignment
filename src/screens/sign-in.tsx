import { View, Text, ScrollView, Button, Alert } from "react-native";
import React, { useState, useContext } from "react";
import CustomButton from "../components/CustomButton";
import { Link, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginUser } from "../services/auth";
import FormField from "../components/FormField";
import { AuthContext } from "../context/AuthContext";

const SignInScreen = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { setIsLoggedIn } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    try {
      await loginUser(form.email, form.password);
      setIsLoggedIn(true); // Update global auth state
      navigation.navigate("Main");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[75vh] px-4 my-6 ">
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log In
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Link screen="SignUp" className="text-lg font-psemibold text-slate">
              GO BACK
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
