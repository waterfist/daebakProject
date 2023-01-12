import React, { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";

import styled from "@emotion/native";
import { authService } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { emailRegex, pwRegex } from "../util";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
export default function Login({
  navigation: { navigate, setOptions, goBack },
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordShortError, setPasswordShortError] = useState(false);
  const [visablePassword, setVisablePassword] = useState(true);
  const [inputClear, setInputClear] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handlerInputClear = () => {
    setPassword("");
  };

  const visibleToggle = () => {
    setVisablePassword(!visablePassword);
  };

  const handleLogin = () => {
    const matchedEmail = email.match(emailRegex);
    const matchedPw = password.match(pwRegex);

    if (matchedEmail === null) {
      setEmailError(true);
      emailRef.current.focus();
      return true;
    } else {
      setEmailError(false);
    }
    if (matchedPw === null) {
      setPasswordShortError(true);
      passwordRef.current.focus();
      return true;
    } else {
      setPasswordShortError(false);
    }

    signInWithEmailAndPassword(authService, email, password)
      .then(() => {
        console.log("로그인 성공");
        setEmail("");
        setPassword("");
        navigate("Tabs", { screen: "Home" });
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("user-not-found")) {
          alert("회원이 아닙니다. 회원가입을 먼저 진행해주세요.");
        }
        if (err.message.includes("wrong-password")) {
          alert("비밀번호가 틀렸습니다.");
        }
      });
  };

  useEffect(() => {
    setOptions({ headerRight: () => null });
  }, []);

  return (
    <BgSafeAreaView>
      <Background>
        <ImageLogo source={require("../assets/images/Logo_1.png")} />

        <Text style={{ color: "black", marginTop: 10 }}>아이디</Text>

        <ContainerStyle value={email} ref={emailRef} onChangeText={setEmail} />
        {emailError && (
          <Text style={{ color: "red", marginTop: 10 }}>
            이메일이 올바르지 않습니다.
          </Text>
        )}

        <View style={{ width: "100%" }}>
          <Text style={{ color: "black", marginTop: 10 }}>비밀번호</Text>
          <ContainerStyle
            secureTextEntry={visablePassword}
            ref={passwordRef}
            value={password}
            onChangeText={setPassword}
            style={{ position: "relative" }}
          />

          <TouchableOpacity onPress={handlerInputClear}>
            <MaterialIcons
              name="cancel"
              size={24}
              color="black"
              style={{
                position: "absolute",
                top: -35,
                right: 35,
                color: "gray",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={visibleToggle}>
            {visablePassword ? (
              <Entypo
                name="eye"
                size={24}
                color="gray"
                style={{
                  marginTop: 10,
                  position: "absolute",
                  top: -45,
                  right: 10,
                }}
              />
            ) : (
              <Entypo
                name="eye-with-line"
                size={24}
                color="gray"
                style={{
                  marginTop: 10,
                  position: "absolute",
                  top: -45,
                  right: 10,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
        {passwordShortError && (
          <Text style={{ color: "red", marginTop: 10 }}>
            8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.
          </Text>
        )}
        <CustomButton onPress={handleLogin}>
          <CustomButtonText>로그인</CustomButtonText>
        </CustomButton>
        <CustomButton2 onPress={() => navigate("Join")}>
          <CustomButtonText2>회원가입</CustomButtonText2>
        </CustomButton2>
      </Background>
    </BgSafeAreaView>
  );
}

const BgSafeAreaView = styled.View`
  flex: 1;
  justify-content: center;

  background-color: white;
`;

const Background = styled.View`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  padding: 20px;
`;
const ImageLogo = styled.Image`
  width: 100%;
`;

const ContainerStyle = styled.TextInput`
  width: 100%;
  background-color: white;
  border-color: cornflowerblue;

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
  background-color: #b7bdc7;
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
