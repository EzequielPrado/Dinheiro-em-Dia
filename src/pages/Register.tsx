import React, { useState } from 'react';
import { addUser } from '../repository/firebase';
import { SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { User } from '../interfaces/User';
import { urubuBase64 } from '../shared/icons';
import { StatusBar } from 'expo-status-bar';




export function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');



  const handleRegister = (name: string, email: string, password: string) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    if (trimmedName.length === 0 || trimmedEmail.length === 0 || trimmedPassword.length === 0) {
      setError('Preencha todos os campos.');
      return;
    }

    const newUser = {
      name: trimmedName,
      email: trimmedEmail,
      password: trimmedPassword,
      cep: '',
      profilePicture: urubuBase64,
      bankAccounts: []
    } as User;
    const success = addUser(newUser);
    if (!success) {
      setError('Email já cadastrado.');
      return;
    }

    navigation.pop();
  }



  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('../../assets/icons/Logo2.png')}/>
      <Text style={styles.text}>Registro</Text>
      <Text style={styles.subtitle}>Registre uma nova conta</Text>
      <TextInput style={styles.input} onChangeText={setName} keyboardType='default' placeholder='Primeiro Nome'/>
      <TextInput style={styles.input} onChangeText={setEmail} keyboardType='email-address' placeholder='Email'/>
      <TextInput style={styles.input} onChangeText={setPassword} secureTextEntry={true} placeholder='Senha'/>
      {
        error.length > 0 && <Text style={styles.error}>{error}</Text>
      }
      <TouchableOpacity style={styles.button} onPress={() => handleRegister(name, email, password)}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <StatusBar/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  subtitle: {
    marginHorizontal: 80,
    color: '#666',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 30
  },
  image: {
    width: '50%',
    height: '30%',
    resizeMode: 'contain',
  },
  text: {
    fontSize: 35,
    color: '#fff',
    fontWeight: '900',
  },
  button: {
    backgroundColor: '#993399',
    marginTop: 110,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700'
  },
  input: {
    backgroundColor: '#fff',
    color: '#222',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    fontSize: 17,
    width: '85%'
  },
  error: {
    marginHorizontal: 80,
    color: '#f00',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 30
  },
});
