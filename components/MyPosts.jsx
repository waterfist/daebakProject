import React, { useState, useCallback } from "react";
import styled from "@emotion/native";
import {
  getDoc,
  onSnapshot,
  query,
  collection,
  doc,
  oderBy,
  updateDoc,
  deleteDoc,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { dbService } from "../firebase";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const q = query(
        collection(dbService, "posts"),
        orderBy("createdAt", "desc")
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
          <UserPostsView key={post.id}>
            <Text>{post.title}</Text>
            <Text>{post.contents}</Text>
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
