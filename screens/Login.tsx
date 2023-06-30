import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import Layout from '../components/Layout';
// import {FIREBASE_AUTH} from '../../firebaseConfig';

const auth = getAuth();

const Login = ({navigation}) => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    error: '',
  });

  const loginFunction = async () => {
    if (userDetails.email === '' || userDetails.password === '') {
      setUserDetails({
        ...userDetails,
        error: 'Please enter email and password',
      });
      return;
    }
    try {
      signInWithEmailAndPassword(auth, userDetails.email, userDetails.password);
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
        <Text className="text-slate-200 ">Email:</Text>
        <TextInput
          className="h-10  my-2 border rounded-md p-2 text-slate-200 border-slate-200"
          placeholder="Enter Email..."
          placeholderTextColor={'#64748b'}
          textContentType="emailAddress"
          keyboardType="email-address"
          onChangeText={input => setUserDetails({...userDetails, email: input})}
          value={userDetails.email}
          autoCapitalize="none"
        />
      </View>
      <View className="my-2">
        <Text className="text-slate-200 ">Password:</Text>
        <TextInput
          className="h-10 my-2    border rounded-md p-2 text-slate-200 border-slate-200"
          placeholder="Enter Password..."
          placeholderTextColor={'#64748b'}
          secureTextEntry
          textContentType="password"
          autoCapitalize="none"
          onChangeText={input =>
            setUserDetails({...userDetails, password: input})
          }
          value={userDetails.password}
        />
      </View>
      <Button onPress={loginFunction} title="Sign in" color={'#e2e8f0'} />
      <Button
        onPress={() => navigation.navigate('Registration page')}
        title="Register new account"
        color={'#e2e8f0'}
      />
    </Layout>
  );
};

export default Login;
