import styled from "@emotion/native";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";

export default function PostLoader({ posts, category, navigate }) {
  const goToComment = (post, postId) => {
    navigate("Stacks", {
      screen: "Post",
      params: { post: post, from: "My" },
    });
  };
  return (
    <>
      {posts
        .filter(
          (cate) => cate.category === category && cate.category !== undefined
        )
        .map((post, key) => {
          return (
            <SC key={key}>
              <Container>
                <ListBox>
                  <ListButton
                    onPress={() => {
                      goToComment(post);
                    }}
                  >
                    <ListCardTitle>
                      <TitleText numberOfLines={1} ellipsizeMode="tail">
                        &#91;{category}
                        &#93;{post.title}
                      </TitleText>
                    </ListCardTitle>
                    <ListCardContent>
                      <ContentText numberOfLines={2} ellipsizeMode="tail">
                        {post.contents}
                      </ContentText>
                    </ListCardContent>
                  </ListButton>
                </ListBox>
              </Container>
            </SC>
          );
        })}
    </>
  );
}

export const SC = styled.ScrollView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ListBox = styled.View`
  background-color: #dbe7ff;
  border: 0.5px solid #074ee8;
  border-radius: 15px;
  height: 110px;
  padding: 10px;
  width: 85%;
  margin-top: 20px;
`;

export const ListButton = styled.TouchableOpacity`
  height: 80px;
`;

export const ListCardTitle = styled.View`
  /* background-color: lightgray; */
  height: 40px;
`;

export const ListCardContent = styled.View`
  /* background-color: lightgray; */
  height: 40px;
`;

export const TitleText = styled.Text`
  font-size: 20px;
`;

export const ContentText = styled.Text`
  font-size: 14px;
`;
