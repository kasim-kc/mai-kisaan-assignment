import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from "react-native";

import React, { useContext, useCallback, useState, useEffect } from "react";
import { Button } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { fetchPosts } from "../services/api";
// import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "../stacks/types";

type Props = {
  navigation: HomeScreenNavigationProp;
};

type Post = {
  id: number;
  title: string;
  body: string;
};

const HomeScreen = ({ navigation }: Props) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate("SignIn");
    } catch (error) {
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async (pageNumber: number, isRefreshing = false) => {
    if (loading || (!isRefreshing && !hasMore)) return; // Prevent multiple calls
    setLoading(true);

    try {
      const newPosts = await fetchPosts(pageNumber);
      if (newPosts.length === 0) {
        setHasMore(false); // No more posts to load
      } else {
        setPosts((prev) => (isRefreshing ? newPosts : [...prev, ...newPosts]));
        setPage((prev) => (isRefreshing ? 1 : prev + 1));
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadPosts(page);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    loadPosts(1, true); // Load the first page again
  }, []);

  const renderItem = ({ item }: { item: Post }) => (
    <TouchableOpacity
      className="bg-white rounded-lg shadow-sm p-4 mb-4"
      onPress={() => navigation.navigate("Details", { postId: item.id })}
    >
      <Image
        source={{ uri: `https://picsum.photos/200?random=${item.id}` }}
        className="w-full h-48 rounded-lg mb-3"
      />
      <Text className="text-lg font-bold mb-1">{item.title}</Text>
      <Text className="text-sm text-gray-600">{item.body}</Text>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loading) return null; // Don't show footer if not loading
    return (
      <View className="py-5 items-center">
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };
  return (
    <View className="flex justify-center items-center">
      <Text className="text-3xl">Home</Text>
      <Button title="Logout" onPress={handleLogout} />

      <FlatList
        data={posts}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        onEndReached={() => loadPosts(page)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default HomeScreen;
