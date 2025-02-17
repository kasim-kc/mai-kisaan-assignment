import React, { useEffect, useState } from "react";
import { ActivityIndicator, Button, Image, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { MainStackParamList } from "../stacks/types";
import { fetchPostDetails } from "../services/api";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

type DetailsScreenRouteProp = RouteProp<MainStackParamList, "Details">;
type HomeScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "Details"
>;

type Props = {
  route: DetailsScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};
type PostDetails = {
  id: number;
  title: string;
  body: string;
  imageUrl: string;
};

export default function DetailsScreen({ route, navigation }: Props) {
  const { postId } = route.params;
  const [post, setPost] = useState<PostDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const data = await fetchPostDetails(postId);
        setPost({
          id: data.id,
          title: data.title,
          body: data.body,
          imageUrl: `https://picsum.photos/200?random=${data.id}`,
        });
      } catch (error) {
        console.error("Error fetching post details:", error);
      } finally {
        setLoading(false);
      }
    };

    getPostDetails();
  }, [postId]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <Image
        source={{ uri: post?.imageUrl }}
        className="w-full h-60 rounded-lg mb-4"
      />
      <Text className="text-2xl font-bold mb-2">{post?.title}</Text>
      <Text className="text-base text-gray-700 mb-4">{post?.body}</Text>
      <Button title="Go Back to Listings" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}
