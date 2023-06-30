import {Button, Text, TextInput, View, StyleSheet} from 'react-native';
import React, {Component, useState} from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import Layout from '../components/Layout';

const auth = getAuth();

const Register = ({navigation}) => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    error: '',
  });

  const registerFunction = async () => {
    if (userDetails.email === '' || userDetails.password === '') {
      setUserDetails({
        ...userDetails,
        error: 'Please enter email and password',
      });
      return;
    }
    try {
      await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );
      navigation.navigate('Login');
    } catch (err) {
      setUserDetails({
        ...userDetails,
        error: err.message,
      });
    }
  };
  return (
    <Layout>
      <Text className="text-[#01DBC6] self-center text-7xl my-20">Verve</Text>
      <View className="my-2">
        <Text className="text-slate-200">Email:</Text>
        <TextInput
          className="h-10 my-2    border rounded-md p-2 text-slate-200 border-slate-200"
          value={userDetails.email}
          textContentType="emailAddress"
          placeholder="Enter Email..."
          keyboardType="email-address"
          placeholderTextColor={'#64748b'}
          autoCapitalize="none"
          onChangeText={input => {
            setUserDetails({...userDetails, email: input});
          }}
        />
      </View>
      <View className="my-2">
        <Text className="text-slate-200">Password:</Text>
        <TextInput
          className="h-10 my-2    border rounded-md p-2 text-slate-200 border-slate-200"
          placeholder="Enter Password..."
          placeholderTextColor={'#64748b'}
          autoCapitalize="none"
          textContentType="newPassword"
          secureTextEntry
          value={userDetails.password}
          onChangeText={input => {
            setUserDetails({...userDetails, password: input});
          }}
        />
      </View>
      <View>
        <Button onPress={registerFunction} title="Sign up" color={'#e2e8f0'} />
      </View>
      <View>
        <Button
          onPress={() => navigation.navigate('Login page')}
          title="Login (aleady have an account)"
          color={'#e2e8f0'}
        />
      </View>
    </Layout>
  );
};

export default Register;
