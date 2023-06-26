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
    <View style={styles.container}>
      <Text style={styles.title}>Verve</Text>
      <Text style={styles.text}>Login</Text>
      <View>
        <Text style={styles.text}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          onChangeText={input => setUserDetails({...userDetails, email: input})}
          value={userDetails.email}
        />
      </View>
      <Text style={styles.text}>Password:</Text>
      <TextInput
        style={styles.input}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flex: 1,
  },
  title: {
    marginTop: 50,
    marginBottom: 80,
    color: '#01DBC6',
    fontSize: 80,
    textAlign: 'center',
  },
  text: {
    color: 'white',
  },
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
