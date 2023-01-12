import styled from "@emotion/native";
import React, { useCallback } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import { authService } from "../firebase";
import { signOut } from "firebase/auth";
import { useFocusEffect } from "@react-navigation/native";
import MyComments from "../components/MyComments";
import MyPosts from "../components/MyPosts";

export default function My({ navigation: { navigate, reset, setOptions } }) {
  const logout = () => {
    signOut(authService)
      .then(() => {
        console.log("로그아웃 성공");
        alert("로그아웃 성공");
        navigate("Tabs", { screen: "Home" });
      })
      .catch((err) => alert(err));
  };

  useFocusEffect(
    useCallback(() => {
      if (!authService.currentUser) {
        reset({
          index: 1,
          routes: [
            {
              name: "Tabs",
              params: {
                screen: "Home",
              },
            },
            {
              name: "Stacks",
              params: {
                screen: "Login",
              },
            },
          ],
        });
        return;
      }

      setOptions({
        headerRight: () => {
          return (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={logout}>
              <LogoutText>로그아웃</LogoutText>
            </TouchableOpacity>
          );
        },
      });
    }, [])
  );

  return (
    <ScrollView>
      <UserInformationView>
        <TouchableOpacity>
          <UserImage source={require("../assets/images/nullimage.png")} />
        </TouchableOpacity>

        <UserIdText>
          @
          {!authService.currentUser ||
            authService.currentUser.email.split("@")[0]}
        </UserIdText>
      </UserInformationView>

      <TextView>
        <MyPostsText>My Posts</MyPostsText>
      </TextView>
      <UserPostContainer>
        <MyPosts navigate={navigate} />
      </UserPostContainer>

      <TextView>
        <MyPostsText>My Comments</MyPostsText>
      </TextView>
      <UserCommentContainer>
        <MyComments navigate={navigate} />
      </UserCommentContainer>
    </ScrollView>
  );
}

const LogoutText = styled.Text`
  color: #3b71f3;
  font-size: 16px;
  margin-right: 5px;
`;

const UserInformationView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;

  margin-top: 20px;
  margin-bottom: 30px;
`;

const UserImage = styled.Image`
  flex: 1;
  height: 50%;
  width: 100px;
  border-radius: 50px;
  margin-right: 10%;
  background-color: cornflowerblue;
`;

const UserIdText = styled.Text`
  font-size: 25px;
`;

const TextView = styled.View`
  flex: 1;
  align-items: center;
  border-bottom-width: 1px;
  margin-left: 12%;
  margin-right: 12%;
  margin-bottom: 5%;
  border-color: #3b71f3;
  padding: 15px 0px;
`;

const MyPostsText = styled.Text`
  font-size: 25px;
  color: #3b71f3;
`;

const UserPostContainer = styled.View`
  align-items: center;
`;

const UserCommentContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-left: 12%;
  margin-right: 12%;
  margin-bottom: 5%;
`;
