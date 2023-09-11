import {Button, Text, TextInput, View, StyleSheet} from 'react-native';
import React, {Component, useState} from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import Layout from '../components/Layout';
import AnimatedInput from 'react-native-animated-input';

const auth = getAuth();

const Register = ({navigation}) => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    error: '',
  });
  const [isValid, setIsValid] = useState(true);

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
        <AnimatedInput
          placeholder="Enter Email..."
          valid={isValid}
          onChangeText={input => {
            setUserDetails({...userDetails, email: input});
          }}
          value={userDetails.email}
          styleInput={{color: '#e2e8f0', padding: 0.5, height: 35}}
          errorText="Please enter a valid weight."
          styleLabel={{fontWeight: '600', fontSize: 16}}
          keyboardType="email-address"
          placeholderTextColor={'#64748b'}
          textContentType="emailAddress"
          autoCapitalize="none"
        />
      </View>
      <View className="my-2">
        <AnimatedInput
          placeholder="Enter Password..."
          valid={isValid}
          onChangeText={input => {
            setUserDetails({...userDetails, password: input});
          }}
          value={userDetails.password}
          styleInput={{color: '#e2e8f0', padding: 0.5, height: 35}}
          errorText="Please enter a valid weight."
          styleLabel={{fontWeight: '600', fontSize: 16}}
          placeholderTextColor={'#64748b'}
          autoCapitalize="none"
          textContentType="newPassword"
          secureTextEntry
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
