import React, { useEffect, useState } from 'react';
import AppContext from './src/contexts/AppContext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/pages/Login';
import { Home } from './src/pages/Home';
import { Register } from './src/pages/Register';
import { User } from './src/interfaces/User';
import { BankAccount } from './src/interfaces/BankAccount';
import { Profile } from './src/pages/Profile';
import { Manager } from './src/pages/Manager';
import { Account } from './src/pages/Account';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState<User>(undefined);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [showBalance, setShowBalance] = useState<boolean>(true);

  useEffect(() => {
    const getEyeState = async () => { 
      const state = await AsyncStorage.getItem('@eyeState');
      if (state) setShowBalance(state === 'true');
    }
    getEyeState();
  }, []);


  return (
    <AppContext.Provider value={{ user, setUser, bankAccounts, setBankAccounts, showBalance, setShowBalance }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Register' component={Register} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Profile' component={Profile} />
          <Stack.Screen name='Manager' component={Manager} />
          <Stack.Screen name='Account' component={Account} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  )
}
