import styled from "@emotion/native";
import React from "react";

export default function PostLoader({ posts, category }) {
  return (
    <>
      {posts
        .filter((post) => post.category === category)
        .map((post) => {
          return (
            <ListBox>
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
