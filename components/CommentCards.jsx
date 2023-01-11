import styled from "@emotion/native";
import React from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { useMutation } from "react-query";
import { deleteComment } from "../api";

const CommentCards = ({ comment }) => {
  const { isLoading: isLoadingDeleting, mutate: removeComment } = useMutation(
    ["deleteComment", comment.id],
    (body) => deleteComment(body),
    {
      onSuccess: () => {
        console.log("삭제성공");
      },
      onError: (err) => {
        console.log("err in delete:", err);
      },
    }
  );

  const onDeleteComment = async (id) => {
    Alert.alert("댓글 삭제", "정말 현재 댓글을 삭제하시겠습니까?", [
      { text: "cancel", style: "destructive" },
      {
        text: "OK. Delete it.",
        onPress: async () => {
          try {
            // await deleteDoc(doc(dbService, "reviews", review.id));
            await removeComment(id);
            alert("삭제가 완료되었습니다.");
          } catch (err) {
            console.log("err:", err);
          }
        },
      },
    ]);
  };

  if (isLoadingDeleting) {
    return <Text>조금만 기다려주세요!</Text>;
  }

  return (
    <>
      <UserCommentsView key={comment.id}>
        <Text>{comment.title}</Text>
        <Text>{comment.contents}</Text>
        <Text>{new Date(comment.createdAt).toLocaleDateString("kr")}</Text>
        <TouchableOpacity onPress={() => onDeleteComment(comment.id)}>
          <Text>삭제</Text>
        </TouchableOpacity>
      </UserCommentsView>
    </>
  );
};

export default CommentCards;

const UserCommentsView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  background-color: green;

  height: 130px;
  width: 230px;
`;
