import {Button, Text, TextInput, View} from 'react-native';
import React, {Component, useState} from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';

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
    <View className="w-full h-full">
      <Text className="font-title">Register</Text>
      <View>
        <TextInput
          placeholder="email"
          value={userDetails.email}
          onChangeText={input => {
            setUserDetails({...userDetails, email: input});
          }}
        />
      </View>
      <View>
        <TextInput
          placeholder="password"
          value={userDetails.password}
          onChangeText={input => {
            setUserDetails({...userDetails, password: input});
          }}
        />
      </View>
      <View>
        <Button onPress={registerFunction} title="Sign up" />
      </View>
      <View>
        <Button
          onPress={() => navigation.navigate('Login page')}
          title="Login (aleady have an account)"
        />
      </View>
    </View>
  );
};

export default Register;
