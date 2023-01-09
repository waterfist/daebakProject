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

import styled from "@emotion/native";

const BgSafeAreaView = styled.SafeAreaView``;

const Background = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: black; */
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

export default function Login() {
  const [id, setId] = useState(id);
  const [password, setPassword] = useState(password);
  const textRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <BgSafeAreaView>
      <Background>
        <Image source={require("../assets/images/Logo_1.png")} />

        <TouchableOpacity onPress={() => textRef.current.focus()}>
          <Text style={{ color: "#3b71f3", right: 155, top: 10 }}>아이디</Text>
        </TouchableOpacity>
        <ContainerStyle placeholder="Id" value={id} ref={textRef} />

        <TouchableOpacity onPress={() => passwordRef.current.focus()}>
          <Text style={{ color: "#3b71f3", right: 150, top: 10 }}>
            비밀번호
          </Text>
        </TouchableOpacity>
        <ContainerStyle
          placeholder="Password"
          value={password}
          ref={passwordRef}
          secureTextEntry={true}
        />

        <CustomButton>
          <CustomButtonText>로그인</CustomButtonText>
        </CustomButton>
        <CustomButton2>
          <CustomButtonText2>회원가입</CustomButtonText2>
        </CustomButton2>
      </Background>
    </BgSafeAreaView>
  );
}
