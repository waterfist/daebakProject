import React, { useState, useCallback } from "react";
import styled from "@emotion/native";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  where,
} from "firebase/firestore";
import { Text, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { authService, dbService } from "../firebase";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // 현재 로그인 사용자의 post만 나오도록 구현
      const q = query(
        collection(dbService, "posts"),
        orderBy("createdAt", "desc")
        // where("userId", "==", authService.currentUser?.uid)
      );

      const unsubcribe = onSnapshot(q, (snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(newPosts);
      });

      return unsubcribe;
    }, [])
  );
  return (
    <>
      {posts.map((post) => {
        return (
          // delete 기능 추가
          <UserPostsView key={post.id}>
            <Text>{post.title}</Text>
            <Text>{post.contents}</Text>
            <TouchableOpacity>
              <Text>삭제</Text>
            </TouchableOpacity>
          </UserPostsView>
        );
      })}
    </>
  );
};

const UserPostsView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  background-color: green;

  height: 130px;
  width: 230px;
`;

export default MyPosts;
