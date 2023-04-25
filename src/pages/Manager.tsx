import AppContext from '../contexts/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { useContext, useEffect } from 'react';
import { updateUser } from '../repository/firebase';
import { Box } from '../components/Box';
import { AccountList } from '../components/AccountList';
import { User } from '../interfaces/User';
import { BankAccount } from '../interfaces/BankAccount';

export function Manager ({ navigation }) {
  const { bankAccounts, user, setUser } = useContext(AppContext);

  useEffect(() => {
    const updatedUser: User = { ...user, bankAccounts: bankAccounts };
    setUser(updatedUser);
    updateUser(updatedUser);
  }, [bankAccounts]);

  const editAccount = (account: BankAccount) => navigation.push('Account', { account, navigation });

  return (
    <LinearGradient style={styles.background} colors={['#000', '#000']} locations={[0.2, 0.2]}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Gerencie suas entradas e saidas</Text>
        <View style={styles.main}>
          <Box>
            <AccountList bankAccounts={bankAccounts} itemTouchCallback={editAccount}/>
            <TouchableOpacity style={styles.button} onPress={() => navigation.push('Account', { navigation })}>
                <Text style={styles.buttonText}>Adicione entradas e saidas</Text>
              </TouchableOpacity>
          </Box>
        </View>
        <TouchableOpacity style={styles.button2} onPress={() => navigation.pop()}>
          <Text style={styles.buttonText2}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '85%',
  },
  modal: {
    backgroundColor: '#00000050',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  button: {
    backgroundColor: '#993399',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700'
  },
  button2: {
    backgroundColor: '#993399',
    marginTop: 35,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 30,
  },
  buttonText2: {
    color: '#fff',
    fontWeight: '700'
  },
  text: {
    color: '#fff',
    fontWeight: '400',
    marginBottom: 20
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 65
  }
});
