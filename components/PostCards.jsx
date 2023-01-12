import React, { useState } from "react";
import { TouchableOpacity, Text, Alert, View } from "react-native";
import styled from "@emotion/native";
import { useMutation } from "react-query";
import { deletePost } from "../api";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BLUE_COLOR } from "../color";
// MY > MyPosts =  MyComments > Postcards = CommentCards

// props으로 navigation을 받아와야하는데 안됨
// navigate가 함수가 아니라고 오류뚬

const PostCards = ({ post, navigate }) => {
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

  const [modalVisible, setModalVisible] = useState(false);

  const onDeletePost = async (id) => {
    Alert.alert("게시글 삭제", "정말 현재 게시글을 삭제하시겠습니까?", [
      { text: "cancel", style: "destructive" },
      {
        text: "OK. Delete it.",
        onPress: async () => {
          try {
            await removePost(id);
            alert("삭제가 완료되었습니다.");
          } catch (err) {
            console.log("err:", err);
          }
        },
      },
    ]);
  };

  // const goToPost = () => {
  //   navigate("Stacks", { screen: "Post" });
  // };

  if (isLoadingDeleting) {
    return <Text>조금만 기다려주세요!</Text>;
  }

  const goMyPost = (post) => {
    navigate("Stacks", {
      screen: "Post",
      params: { post: post, from: "My" },
    });
  };

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={() => goMyPost(post)}>
      <View>
        <UserPostsView key={post.id}>
          <TextContainer>
            <StaticText>제목</StaticText>
            <VariableText numberOfLines={1} ellipsizeMode="tail">
              {post.title}
            </VariableText>
          </TextContainer>
          <TextContainer>
            <StaticText>내용</StaticText>
            <VariableText numberOfLines={1} ellipsizeMode="tail">
              {post.contents}
            </VariableText>
          </TextContainer>
          <TextContainer>
            <StaticText>작성일</StaticText>
            <VariableText numberOfLines={1} ellipsizeMode="tail">
              {new Date(post.createdAt).toLocaleDateString("kr")}
            </VariableText>
          </TextContainer>
          <DeleteButtonBoxView>
            <TouchableOpacity onPress={() => onDeletePost(post.id)}>
              <MaterialCommunityIcons
                name="delete-forever-outline"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </DeleteButtonBoxView>
        </UserPostsView>
      </View>
    </TouchableOpacity>
  );
};

export default PostCards;

const UserPostsView = styled.View`
  flex: 1;
  flex-direction: column;
  border-radius: 10px;
  border-width: 1px;
  border: 0.3px solid #3b71f3;
  background-color: white;

  height: 130px;
  width: 300px;
  padding: 10px;
  margin-bottom: 10px;
`;

const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 240px;
  margin-top: 10px;
`;

const DeleteButtonBoxView = styled.View`
  align-items: flex-end;
  width: 100%;
  height: 25%;
  justify-content: flex-end;
  margin-top: -13px;
`;

const StaticText = styled.Text`
  font-size: 22px;
  margin-right: 7px;
`;

const VariableText = styled.Text`
  font-size: 16px;
`;

export const CustomButton = styled.TouchableOpacity`
  background-color: #3b71f3;
  width: 100%;
  padding: 15px;
  margin: 5px 0px;
  border-radius: 5px;
  align-items: center;
  margin-top: 15px;
`;

export const CustomButtonText = styled.Text`
  color: white;
`;
