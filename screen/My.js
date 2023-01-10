import styled from "@emotion/native";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, Image } from "react-native";
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
import { dbService } from "../firebase";
import {
  createNavigatorFactory,
  useFocusEffect,
} from "@react-navigation/native";
import MyComments from "../components/MyComments";
import MyPosts from "../components/MyPosts";

// 로그인 후에만 해당 컴포넌트가 렌더링 되도록 해야한다.
export default function My() {
  return (
    <ScrollView>
      <UserInformationView>
        {/* onPress 속성으로 이미지 update */}
        <TouchableOpacity>
          <UserImage source={require("../assets/images/nullimage.png")} />
        </TouchableOpacity>
        {/* onPress 속성으로 닉네임 update */}
        <TouchableOpacity>
          {/* 유저 id와 일치하는 닉네임 받아오기 */}
          <UserNickNameText>@닉네임</UserNickNameText>
        </TouchableOpacity>
      </UserInformationView>

      <TextView>
        <MyPostsText>My Posts</MyPostsText>
      </TextView>
      <UserPostContainer>
        {/* currentUserId와 동일한 포스트를 filter하고 map함수로 서버로부터 받아온 포스트들의 title, 작성일을 뿌려준다. */}
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

const UserNickNameText = styled.Text`
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
