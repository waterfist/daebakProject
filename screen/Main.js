import React from "react";
import { Image, useColorScheme } from "react-native";
import styled from "@emotion/native";
import { StyleSheet } from "react-native";
import { GREEN_COLOR, YELLOW_COLOR, BLUE_COLOR } from "../color";
export default function Main({ navigation: { navigate } }) {
  const isDark = useColorScheme() === "dark";
  return (
    <Container>
      <MainLeftContainer>
        <MainButton
          onPress={() => {
            navigate("Stacks", {
              screen: "PostList",
              params: { category: "기술" },
            });
          }}
        >
          <Image
            source={require("../assets/images/technology.png")}
            style={styles.image}
          />
          <Titleposition style={{ color: isDark ? YELLOW_COLOR : BLUE_COLOR }}>
            기술
          </Titleposition>
        </MainButton>
        <MainButton
          onPress={() => {
            navigate("Stacks", {
              screen: "PostList",
              params: { category: "교육" },
            });
          }}
        >
          <Image
            source={require("../assets/images/education.png")}
            style={styles.image}
          />
          <Titleposition style={{ color: isDark ? YELLOW_COLOR : BLUE_COLOR }}>
            교육
          </Titleposition>
        </MainButton>
        <MainButton
          onPress={() => {
            navigate("Stacks", {
              screen: "PostList",
              params: { category: "보건" },
            });
          }}
        >
          <Image
            source={require("../assets/images/health.png")}
            style={styles.image}
          />
          <Titleposition style={{ color: isDark ? YELLOW_COLOR : BLUE_COLOR }}>
            보건
          </Titleposition>
        </MainButton>
        <MainButton
          onPress={() => {
            navigate("Stacks", {
              screen: "PostList",
              params: { category: "문화" },
            });
          }}
        >
          <Image
            source={require("../assets/images/culture.png")}
            style={styles.image}
          />
          <Titleposition style={{ color: isDark ? YELLOW_COLOR : BLUE_COLOR }}>
            문화
          </Titleposition>
        </MainButton>
      </MainLeftContainer>
      <MainRightContainer>
        <MainButton
          onPress={() => {
            navigate("Stacks", {
              screen: "PostList",
              params: { category: "환경" },
            });
          }}
        >
          <Image
            source={require("../assets/images/environment.png")}
            style={styles.image}
          />
          <Titleposition style={{ color: isDark ? YELLOW_COLOR : BLUE_COLOR }}>
            환경
          </Titleposition>
        </MainButton>
        <MainButton
          onPress={() => {
            navigate("Stacks", {
              screen: "PostList",
              params: { category: "교통" },
            });
          }}
        >
          <Image
            source={require("../assets/images/traffic.png")}
            style={styles.image}
          />
          <Titleposition style={{ color: isDark ? YELLOW_COLOR : BLUE_COLOR }}>
            교통
          </Titleposition>
        </MainButton>
        <MainButton
          onPress={() => {
            navigate("Stacks", {
              screen: "PostList",
              params: { category: "정치" },
            });
          }}
        >
          <Image
            source={require("../assets/images/politics.png")}
            style={styles.image}
          />
          <Titleposition style={{ color: isDark ? YELLOW_COLOR : BLUE_COLOR }}>
            정치
          </Titleposition>
        </MainButton>

        <MainButton
          onPress={() => {
            navigate("Stacks", {
              screen: "PostList",
              params: { category: "etc" },
            });
          }}
        >
          <Image
            source={require("../assets/images/etc.png")}
            style={styles.image}
          />
          <Titleposition style={{ color: isDark ? YELLOW_COLOR : BLUE_COLOR }}>
            etc
          </Titleposition>
        </MainButton>
      </MainRightContainer>
    </Container>
  );
}

export const Title = styled.Text`
  font-size: 30px;
`;

export const Container = styled.View`
  flex: 1;

  align-content: space-between;
  flex-direction: row;
`;

export const MainButton = styled.TouchableOpacity`
  background-color: lightgray;
  width: 90px;
  height: 90px;
  align-items: center;
  justify-content: center;
  border-radius: 35px;
`;

export const MainLeftContainer = styled.View`
  display: flex;

  align-items: center;
  padding: 70px;
  width: 50%;
  height: 100%;

  justify-content: space-between;
`;

export const MainRightContainer = styled.View`
  justify-content: space-between;

  align-items: center;
  flex: 1;
  width: 50%;
  height: 100%;
  padding: 70px;
`;

export const Titleposition = styled.Text`
  position: absolute;
  top: 90px;
  font-size: 20px;
  margin-top: 7px;
  font-weight: bold;
`;

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,

    resizeMode: "cover",
    borderRadius: 30,
  },
});
