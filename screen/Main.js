import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styled from '@emotion/native';

export default function Main({ navigation: { navigate } }) {
  // const setCat = async cat => {
  //   setCategory(cat);
  //   // await AsyncStorage.setItem("category", cat);
  //   await updateDoc(doc(dbService, 'category', 'currentCategory'), {
  //     category: cat,
  //   });
  // };

  return (
    <Container>
      <MainLeftContainer>
        <MainButton
          onPress={() => {
            setCat('기술'), navigate('Stacks', { screen: 'PostList' });
          }}
        >
          <Title>기술</Title>
        </MainButton>
        <MainButton
          onPress={() => {
            setCat('교육'), navigate('Stacks', { screen: 'PostList' });
          }}
        >
          <Title>교육</Title>
        </MainButton>
        <MainButton
          onPress={() => {
            setCat('보건'), navigate('Stacks', { screen: 'PostList' });
          }}
        >
          <Title>보건</Title>
        </MainButton>
        <MainButton
          onPress={() => {
            setCat('문화'), navigate('Stacks', { screen: 'PostList' });
          }}
        >
          <Title>문화</Title>
        </MainButton>
      </MainLeftContainer>
      <MainRightContainer>
        <MainButton
          onPress={() => {
            setCat('환경'), navigate('Stacks', { screen: 'PostList' });
          }}
        >
          <Title>환경</Title>
        </MainButton>
        <MainButton
          onPress={() => {
            setCat('교통'), navigate('Stacks', { screen: 'PostList' });
          }}
        >
          <Title>교통</Title>
        </MainButton>
        <MainButton
          onPress={() => {
            setCat('정치'), navigate('Stacks', { screen: 'PostList' });
          }}
        >
          <Title>정치</Title>
        </MainButton>
        <MainButton
          onPress={() => {
            setCat('경제'), navigate('Stacks', { screen: 'PostList' });
          }}
        >
          <Title>경제</Title>
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
  /* background-color: lightgray; */
  align-content: space-between;
  flex-direction: row;
`;

export const MainButton = styled.TouchableOpacity`
  background-color: lightgray;
  width: 120px;
  height: 80px;
  align-items: center;
  justify-content: center;
`;

export const MainLeftContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 100px;
  width: 50%;
  height: 100%;
  /* background-color: red; */
`;

export const MainRightContainer = styled.View`
  justify-content: space-between;
  /* background-color: green; */
  align-items: center;
  flex: 1;
  width: 50%;
  height: 100%;
  padding: 100px;
`;
