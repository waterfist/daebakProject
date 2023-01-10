import React, { useEffect, useRef, useState } from "react";
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
  /* display: flex; */
  align-items: flex-start;
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
  margin-top: 8px;
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
  text-align: center;
`;

export default function Join({ navigation: { navigate } }) {
  const idRef = useRef(null);
  const nicknameRef = useRef(null);
  const passwordRef = useRef(null);
  const checkPasswordRef = useRef(null);

  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // const onChangeId = (e) => {
  //   setId(e.target.value);
  // };

  // const onChangeNickname = (e) => {
  //   setNickname(e.target.value);
  // };

  // const onChangePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  // const onChangeCheckPassword = (e) => {
  //   setCheckPassword(e.target.value);
  //   console.log(passwordError);
  // };

  // useEffect(() => {
  //   console.log("작동");
  //   if (password !== checkPassword) {
  //     setPasswordError(!passwordError);
  //   }
  // }, [checkPassword]);

  // if (password !== checkPassword) {
  //   setPasswordError(true);
  // } else {
  //   setPasswordError(false);
  // }

  const handleSignUpComplete = () => {
    if (password !== checkPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  return (
    <BgSafeAreaView>
      <Background>
        <JoinTopView>
          <JoinTopText>2023 그거알고 있니?</JoinTopText>
        </JoinTopView>
        {/* <TouchableOpacity onPress={() => idRef.current.focus()}> */}
        <Text style={{ color: "#3b71f3", marginTop: 10 }}>아이디</Text>
        {/* </TouchableOpacity> */}
        <ContainerStyle ref={idRef} value={id} onChangeText={setId} />

        {/* <TouchableOpacity onPress={() => nicknameRef.current.focus()}> */}
        <Text style={{ color: "#3b71f3", marginTop: 10 }}>닉네임</Text>
        {/* </TouchableOpacity> */}
        <ContainerStyle
          ref={nicknameRef}
          value={nickname}
          onChangeText={setNickname}
        />
        {/* <TouchableOpacity onPress={() => passwordRef.current.focus()}> */}
        <Text style={{ color: "#3b71f3", marginTop: 10 }}>비밀번호</Text>
        {/* </TouchableOpacity> */}
        <ContainerStyle
          // secureTextEntry={true}
          ref={passwordRef}
          value={password}
          onChangeText={setPassword}
        />
        {/* <TouchableOpacity onPress={() => checkPasswordRef.current.focus()}> */}

        <Text style={{ color: "#3b71f3", marginTop: 10 }}>비밀번호 확인</Text>
        {/* </TouchableOpacity> */}
        <ContainerStyle
          // secureTextEntry={true}
          ref={checkPasswordRef}
          value={checkPassword}
          onChangeText={setCheckPassword}
          // setCheckPassword
        />
        {passwordError && (
          <Text style={{ color: "red", marginTop: 10 }}>
            비밀번호 에러 입니다.
          </Text>
        )}
        <CustomButton onPress={handleSignUpComplete}>
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
