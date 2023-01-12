import styled from '@emotion/native';
import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PostLoader({ posts, category, navigate }) {
  const goToComment = (post, postId) => {
    navigate('Stacks', {
      screen: 'Post',
      params: { post: post, from: 'My' },
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
            <SC key={key}>
              <Container>
                <ListBox key={key}>
                  <ListButton onPress={() => goToComment(post)}>
                    <TestBox>
                      <Text>
                        <Ionicons
                          name="person-circle-outline"
                          size={60}
                          color="black"
                        />
                      </Text>
                    </TestBox>
                    <TestBoxx>
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
                    </TestBoxx>
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
  background-color: white;
  border: 1.3px solid #074ee8;
  border-radius: 15px;
  height: 100px;
  padding: 10px;
  width: 85%;
  margin-top: 20px;
`;

export const ListButton = styled.TouchableOpacity`
  height: 80px;
  flex-direction: row;
`;

export const ListCardTitle = styled.View`
  /* background-color: lightgray; */
  height: 40px;
  /* background-color: red; */
  width: 200px;
`;

export const ListCardContent = styled.View`
  /* background-color: blue; */
  height: 40px;
`;

export const TitleText = styled.Text`
  font-size: 20px;
`;

export const ContentText = styled.Text`
  font-size: 14px;
`;

export const TestBox = styled.View`
  /* background-color: gray; */
  height: 80px;
  width: 70px;
`;

const TestBoxx = styled.View`
  /* background-color: white; */
  height: 80px;
  width: 200px;
  flex-direction: column;
`;
