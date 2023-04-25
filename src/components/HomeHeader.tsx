import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useContext } from 'react';
import AppContext from '../contexts/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';


interface HomeHeaderProps {
  name: string;
  profilePicture: string;
  navigation: any;
}

export const HomeHeader = (props: HomeHeaderProps) => {
  const { showBalance, setShowBalance } = useContext(AppContext);

  const getEyeIcon = () => {
    return showBalance 
      ? <FontAwesome5 style={styles.eye} name="eye"/>
      : <FontAwesome5 style={styles.eye} name="eye-slash"/>
  }

  const handleEye = async () => {
    const newState = !showBalance;
    setShowBalance(newState);
    await AsyncStorage.setItem('@eyeState', newState.toString());
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/icons/Jullis2.jpg')}/>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá</Text>
        <Text style={styles.username}>{props.name}</Text>
      </View>
      <View style={styles.fill} onTouchStart={() => props.navigation.push('Profile')}>
        <FontAwesome5 style={styles.editPencil} name="pencil-alt"/>
      </View>
        <View style={styles.fillLast}>
        <TouchableOpacity onPress={() => WebBrowser.openBrowserAsync('https://chat.whatsapp.com/KaToHOhMWEcAXAPvCfMeK9')} >
          <FontAwesome5 style={styles.desc} name="money-bill-wave"/>
        </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    borderRadius: 50,
    resizeMode: 'contain',
    height: 60,
    width: 60,
    backgroundColor: '#4dff7f',
    marginRight: 20,
    borderColor: '#fff',
    borderWidth: 3
  },
  header: {
    display: 'flex',
  },
  greeting: {
    color: '#fff',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25
  },
  fillLast: {
    display: 'flex',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: 20,
    marginBottom: 8,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#8ccec650',
  },
  fill: {
    display: 'flex',
    alignSelf: 'flex-end',
    marginLeft: 10,
    marginBottom: 8,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#8ccec650',
  },
  editPencil: {
    color: '#fff',
    fontSize: 14,
  },
  eye: {
    color: '#fff',
    fontSize: 20,
  },
  desc:{
    color: '#fff',
    fontSize: 20,
  }
});
