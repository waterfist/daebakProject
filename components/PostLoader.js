import styled from "@emotion/native";
import React from "react";

export default function PostLoader({ posts, navigate, category }) {
  const goToComment = (theComment) => {
    navigate("Stacks", {
      screen: "Post",
      params: { comment: theComment, from: "My" },
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
            <ListBox key={key}>
              <ListButton>
                <ListCardTitle>
                  <TitleText>{post.title}</TitleText>
                </ListCardTitle>
                <ListCardContent>
                  <ContentText>{post.contents}</ContentText>
                </ListCardContent>
              </ListButton>
            </ListBox>
          );
        })}
    </>
  );
}

export const ListBox = styled.View`
  background-color: lightgray;
  height: 50px;
`;

export const ListButton = styled.TouchableOpacity`
  border: 1px solid black;
  height: 50px;
`;

export const ListCardTitle = styled.View`
  background-color: lightgray;
  height: 25px;
`;

export const ListCardContent = styled.View`
  background-color: lightgray;
  height: 25px;
`;

export const TitleText = styled.Text`
  font-size: 20px;
`;

export const ContentText = styled.Text`
  font-size: 15px;
`;
