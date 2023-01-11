import React from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import styled from "@emotion/native";
import { useMutation } from "react-query";
import { deletePost } from "../api";

const PostCards = ({ post }) => {
  const { isLoading: isLoadingDeleting, mutate: removePost } = useMutation(
    ["deletePost", post.id],
    (body) => deletePost(body),
    {
      onSuccess: () => {
        console.log("삭제성공");
      },
      onError: (err) => {
        console.log("err in delete:", err);
      },
    }
  );

  const onDeletePost = async (id) => {
    Alert.alert("게시글 삭제", "정말 현재 게시글을 삭제하시겠습니까?", [
      { text: "cancel", style: "destructive" },
      {
        text: "OK. Delete it.",
        onPress: async () => {
          try {
            // await deleteDoc(doc(dbService, "reviews", review.id));
            await removePost(id);
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
      <UserPostsView key={post.id}>
        <Text>{post.title}</Text>
        <Text>{post.contents}</Text>
        <Text>{new Date(post.createdAt).toLocaleDateString("kr")}</Text>
        <TouchableOpacity onPress={() => onDeletePost(post.id)}>
          <Text>삭제</Text>
        </TouchableOpacity>
      </UserPostsView>
    </>
  );
};

export default PostCards;

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
