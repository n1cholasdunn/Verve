import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
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
    <View className="flex-1 items-center justify-center bg-black">
      <Text>Verve</Text>
      <Text>Login</Text>
      <TextInput
        placeholder="email"
        onChangeText={input => setUserDetails({...userDetails, email: input})}
        value={userDetails.email}
      />
      <TextInput
        placeholder="password"
        textContentType="password"
        onChangeText={input =>
          setUserDetails({...userDetails, password: input})
        }
        value={userDetails.password}
      />
      <Button onPress={loginFunction} title="Sign in" />
      <Button
        onPress={() => navigation.navigate('Registration page')}
        title="Register new account"
      />
    </View>
  );
};

export default Login;

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     borderWidth: 1,
//     borderRadius: 4,
//     padding: 10,
//     backgroundColor: '#ffff',
//   },
// });
