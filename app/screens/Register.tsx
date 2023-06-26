import {Button, Text, TextInput, View, StyleSheet} from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Verve</Text>
      <Text style={styles.text}>Register</Text>
      <View>
        <Text style={styles.text}>Email:</Text>
        <TextInput
          style={styles.input}
          value={userDetails.email}
          onChangeText={input => {
            setUserDetails({...userDetails, email: input});
          }}
        />
      </View>
      <View>
        <Text style={styles.text}>Password:</Text>
        <TextInput
          style={styles.input}
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

export default Register;
