import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState, useContext } from "react";
import CustomButton from "../components/CustomButton";
import { Link, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerUser } from "../services/auth";
import FormField from "../components/FormField";
import { AuthContext } from "../context/AuthContext";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);

  const submit = async () => {
    const { email, password, confirmPassword } = form;
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      Alert.alert(error);
      return;
    }

    if (password != confirmPassword) {
      setError("Passwords do not match.");
      Alert.alert(error);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      Alert.alert(error);
      return;
    }

    try {
      await registerUser(email, password);
      setIsLoggedIn(true);
      Alert.alert("Success", "Registration successful!", [
        { text: "OK", onPress: () => navigation.navigate("SignIn") },
      ]);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6 ">
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign Up
          </Text>
          <FormField
            title="Email"
            placeholder="Enter your email address"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(e: any) =>
              setForm({ ...form, confirmPassword: e })
            }
            otherStyles="mt-7"
          />
          {error ? (
            <Text className="text-red mb-[10] text-center">{error}</Text>
          ) : null}

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already Have An Account?
            </Text>
            <Link screen="SignIn" className="text-lg font-psemibold text-slate">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
