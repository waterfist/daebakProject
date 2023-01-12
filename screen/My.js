import styled from "@emotion/native";
import React, { useCallback, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import {
  getDoc,
  onSnapshot,
  query,
  collection,
  doc,
  oderBy,
  updateDoc,
  deleteDoc,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { authService, dbService } from "../firebase";
import { signOut, getAuth } from "firebase/auth";
import {
  NavigationHelpersContext,
  useFocusEffect,
} from "@react-navigation/native";
import MyComments from "../components/MyComments";
import MyPosts from "../components/MyPosts";

// 로그인 후에만 해당 컴포넌트가 렌더링 되도록 해야한다.

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

  const editNickName = () => {};

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
              <Text>로그아웃</Text>
            </TouchableOpacity>
          );
        },
      });
    }, [])
  );

  return (
    <ScrollView>
      <UserInformationView>
        {/* onPress 속성으로 이미지 update */}
        <TouchableOpacity>
          <UserImage source={require("../assets/images/nullimage.png")} />
        </TouchableOpacity>
        {/* onPress 속성으로 닉네임 update */}
        <TouchableOpacity onPress={editNickName}>
          <UserIdText>
            @
            {!authService.currentUser ||
              authService.currentUser.email.split("@")[0]}
          </UserIdText>
        </TouchableOpacity>
      </UserInformationView>

      <TextView>
        <MyPostsText>My Posts</MyPostsText>
      </TextView>
      <UserPostContainer>
        <MyPosts />
      </UserPostContainer>

      <TextView>
        <MyPostsText>My Comments</MyPostsText>
      </TextView>
      <UserCommentContainer>
        <MyComments />
      </UserCommentContainer>
    </ScrollView>
  );
}

const UserInformationView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
  /* background-color: green; */
  margin-top: 20px;
  margin-bottom: 30px;
`;

const UserImage = styled.Image`
  flex: 1;
  height: 50%;
  width: 100px;
  border-radius: 50px;
  margin-right: 10%;
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
`;

const MyPostsText = styled.Text`
  font-size: 25px;
`;

const UserPostContainer = styled.View`
  align-items: center;
`;

const UserPostedBoxView = styled.View`
  width: 230px;
  height: 130px;
  background-color: green;
  align-items: center;
`;

const UserCommentContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-left: 12%;
  margin-right: 12%;
  margin-bottom: 5%;
`;
