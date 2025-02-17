import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type MainStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Details: { postId: number };
  Language: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "Home"
>;
