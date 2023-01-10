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

const MyComments = () => {
  const [comments, setComments] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const q = query(
        collection(dbService, "comment"),
        orderBy("createdAt", "desc")
      );
      const unsubcribe = onSnapshot(q, (snapshot) => {
        const newComments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(newComments);
      });
      return unsubcribe;
    }, [])
  );

  return (
    <>
      {comments.map((comment) => {
        return (
          <UserCommentView key={comment.id}>
            <Text>{comment.title}</Text>
            <Text>{comment.contents}</Text>
          </UserCommentView>
        );
      })}
    </>
  );
};

export default MyComments;

const UserCommentView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  background-color: green;

  height: 130px;
  width: 230px;
`;
