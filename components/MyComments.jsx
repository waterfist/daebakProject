import React, { useState, useCallback } from "react";

import {
  onSnapshot,
  query,
  collection,
  orderBy,
  where,
} from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import { authService, dbService } from "../firebase";
import CommentCards from "./CommentCards";

const MyComments = ({ navigate }) => {
  const [comments, setComments] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // 현재 로그인 사용자의 comment만 나오도록 구현
      const q = query(
        collection(dbService, "comment"),
        orderBy("createdAt", "desc"),
        where(
          "userId",
          "==",
          !authService.currentUser || authService.currentUser?.uid
        )
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
          <CommentCards
            comment={comment}
            key={comment.id}
            navigate={navigate}
          />
        );
      })}
    </>
  );
};

export default MyComments;
