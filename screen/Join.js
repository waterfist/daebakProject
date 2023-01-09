import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Logo from "../assets/images/Logo_1.png";

import styled from "@emotion/native";

const BgSafeAreaView = styled.View`
  flex: 1;
  /* background-color: red; */
  /* display: flex; */
  justify-content: center;
  /* align-items: center; */
`;

const Background = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #eee; */
  padding: 20px;
`;

const ContainerStyle = styled.TextInput`
  width: 100%;
  background-color: white;
  border-color: #e8e8e8;
  border-width: 1px;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 15px;
  padding: 13px;
`;

const CustomButton = styled.TouchableOpacity`
  background-color: #3b71f3;
  width: 100%;
  padding: 15px;
  margin: 5px 0px;
  border-radius: 5px;
  align-items: center;
  margin-top: 15px;
`;

const CustomButton2 = styled.TouchableOpacity`
  background-color: white;
  width: 100%;
  padding: 15px;
  margin: 5px 0px;
  border: #bdbdc9;
  border-radius: 5px;
  align-items: center;
  margin-top: 15px;
`;

const CustomButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

const CustomButtonText2 = styled.Text`
  color: black;
  font-weight: bold;
`;

const JoinTopText = styled.Text`
  color: #3b71f3;
  font-size: 32px;
  font-weight: bold;
`;

const JoinTopView = styled.View`
  margin-bottom: 80px;
`;

export default function Join({ navigation: { navigate } }) {
  const emailRef = useRef(null);
  const nicknameRef = useRef(null);
  const passwordRef = useRef(null);
  const PasswordCheckRef = useRef(null);
  return (
    <BgSafeAreaView>
      <Background>
        <JoinTopView>
          <JoinTopText>2023 그거알고 있니?</JoinTopText>
        </JoinTopView>
        <TouchableOpacity onPress={() => emailRef.current.focus()}>
          <Text style={{ color: "#3b71f3", right: 155, top: 10 }}>이메일</Text>
        </TouchableOpacity>
        <ContainerStyle placeholder="email" ref={emailRef} />

        <TouchableOpacity onPress={() => nicknameRef.current.focus()}>
          <Text style={{ color: "#3b71f3", right: 155, top: 10 }}>닉네임</Text>
        </TouchableOpacity>
        <ContainerStyle placeholder="nickname" ref={nicknameRef} />
        <TouchableOpacity onPress={() => passwordRef.current.focus()}>
          <Text style={{ color: "#3b71f3", right: 150, top: 10 }}>
            비밀번호
          </Text>
        </TouchableOpacity>
        <ContainerStyle
          placeholder="Password"
          secureTextEntry={true}
          ref={passwordRef}
        />
        <TouchableOpacity onPress={() => PasswordCheckRef.current.focus()}>
          <Text style={{ color: "#3b71f3", right: 135, top: 10 }}>
            비밀번호 확인
          </Text>
        </TouchableOpacity>
        <ContainerStyle
          placeholder="PasswordCheck"
          secureTextEntry={true}
          ref={PasswordCheckRef}
        />

        <CustomButton>
          <CustomButtonText>회원가입</CustomButtonText>
        </CustomButton>
        <CustomButton2>
          <CustomButtonText2 onPress={() => navigate("Login")}>
            취소
          </CustomButtonText2>
        </CustomButton2>
      </Background>
    </BgSafeAreaView>
  );
}
