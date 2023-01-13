import styled from "@emotion/native";
import React from "react";
import { Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "react-native-shadow-cards";
export default function PostLoader({ posts, category, navigate }) {
  const goToPost = (post) => {
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
                <Card style={{ padding: 5, margin: 7 }}>
                  <ListBox key={key}>
                    <ListButton onPress={() => goToPost(post)}>
                      <ProfileBox>
                        <Text>
                          <Ionicons
                            name="person-circle-outline"
                            size={60}
                            color="#3B71F3"
                          />
                        </Text>
                      </ProfileBox>
                      <InputContainer>
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
                        <ListCardDate>
                          <Text>
                            &#91;{category}
                            &#93;{" "}
                            {new Date(post.createdAt).toLocaleDateString("kr")}
                          </Text>
                        </ListCardDate>
                      </InputContainer>
                    </ListButton>
                  </ListBox>
                </Card>
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
  /* background-color: red; */
  /* border: 0.5px solid #3b71f3; */
  border-radius: 15px;
  height: 110px;
  padding: 10px;
  width: 85%;
  margin-top: 20px;
`;

export const ListButton = styled.TouchableOpacity`
  height: 80px;
  flex-direction: row;
`;

export const ListCardTitle = styled.View`
  height: 28px;
`;

export const ListCardContent = styled.View`
  height: 45px;
`;

export const ListCardDate = styled.View`
  height: 20px;
  align-items: flex-end;
  margin-right: 7px;
`;

export const TitleText = styled.Text`
  font-size: 20px;
  color: black;
`;

export const ContentText = styled.Text`
  font-size: 14px;
  color: black;
`;

export const ProfileBox = styled.View`
  height: 80px;
  width: 60px;
  margin-right: 5px;
`;

const InputContainer = styled.View`
  height: 80px;
  width: 250px;
  flex-direction: column;
`;
