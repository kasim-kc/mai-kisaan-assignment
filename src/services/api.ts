export const fetchPosts = async (page: number, limit = 10) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  return response.json();
};

export const fetchPostDetails = async (postId: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch post details");
  }
  return response.json();
};
