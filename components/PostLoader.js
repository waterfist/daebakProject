import styled from '@emotion/native';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

export default function PostLoader({ posts, category, navigate }) {
  const goToComment = theComment => {
    navigate('Stacks', {
      screen: 'Post',
      params: { comment: theComment, from: 'My' },
    });
  };
  return (
    <>
      {posts
        .filter(
          cate => cate.category === category && cate.category !== undefined
        )
        .map((post, key) => {
          return (
            <ListBox key={key}>
              <ListButton onPress={() => goToComment(post)}>
                <ListCardTitle>
                  <TitleText numberOfLines={1} ellipsizeMode="tail">
                    {post.title}
                  </TitleText>
                </ListCardTitle>
                <ListCardContent>
                  <ContentText numberOfLines={2} ellipsizeMode="tail">
                    {post.contents}
                  </ContentText>
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
  height: 80px;
`;

export const ListButton = styled.TouchableOpacity`
  border: 1px solid black;
  height: 80px;
`;

export const ListCardTitle = styled.View`
  background-color: lightgray;
  height: 40px;
`;

export const ListCardContent = styled.View`
  background-color: lightgray;
  height: 40px;
`;

export const TitleText = styled.Text`
  font-size: 20px;
`;

export const ContentText = styled.Text`
  font-size: 15px;
`;
