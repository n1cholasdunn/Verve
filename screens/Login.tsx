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
    <View className="bg-zinc-950 h-full">
      <Text className="text-[#01DBC6] self-center text-7xl my-20">Verve</Text>
      <Text className="text-slate-200">Login</Text>
      <View>
        <Text className="text-slate-200">Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          textContentType="emailAddress"
          onChangeText={input => setUserDetails({...userDetails, email: input})}
          value={userDetails.email}
        />
      </View>
      <Text className="text-slate-200">Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="password"
        textContentType="password"
        onChangeText={input =>
          setUserDetails({...userDetails, password: input})
        }
        value={userDetails.password}
      />
      <Button onPress={loginFunction} title="Sign in" color={'#e2e8f0'} />
      <Button
        onPress={() => navigation.navigate('Registration page')}
        title="Register new account"
        color={'#e2e8f0'}
      />
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

export default Login;
