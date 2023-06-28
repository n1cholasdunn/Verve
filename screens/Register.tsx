import {Button, Text, TextInput, View, StyleSheet} from 'react-native';
import React, {Component, useState} from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {NativeWindStyleSheet} from 'nativewind';

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
    <View className="bg-zinc-950 h-full">
      <Text className="text-[#01DBC6] self-center text-7xl my-20">Verve</Text>
      <Text className="text-slate-200">Register</Text>
      <View>
        <Text className="text-slate-200">Email:</Text>
        <TextInput
          style={styles.input}
          value={userDetails.email}
          textContentType="emailAddress"
          autoCapitalize="none"
          onChangeText={input => {
            setUserDetails({...userDetails, email: input});
          }}
        />
      </View>
      <View>
        <Text className="text-slate-200">Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="password"
          autoCapitalize="none"
          textContentType="newPassword"
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
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    color: 'white',
    borderColor: 'white',
  },
});

export default Register;
