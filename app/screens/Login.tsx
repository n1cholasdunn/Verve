import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {FIREBASE_AUTH} from '../../firebaseConfig';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const signUp = async () => {
    try {
      createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      alert('check email');
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async () => {
    try {
      signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text>Verve</Text>
      <Text>Login</Text>
      <TextInput
        placeholder="email"
        style={styles.input}
        onChangeText={(input: string) => setEmail(input)}
        value={email}
      />
      <TextInput
        placeholder="password"
        textContentType="password"
        style={styles.input}
        onChangeText={(input: string) => setPassword(input)}
        value={password}
      />
      <Button onPress={signIn} title="Sign in" />
      <Button onPress={signUp} title="Sign up" />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#ffff',
  },
});
