import AppContext from '../contexts/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, TextInput, FlatList, Image, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import { Box } from '../components/Box';
import { BankAccount } from '../interfaces/BankAccount';
import { HorizontalLine } from '../components/HorizontalLine';
import { icons } from '../shared/icons';



export function Account (props) {
  //? Marretão pq com tipagem não funcionou
  const { bankAccounts, setBankAccounts } = useContext(AppContext);
  const account = props.route.params.account as BankAccount;

  const [name, setName] = useState(account?.name ?? '');
  const [balance, setBalance] = useState<string>(account?.balance.toString() ?? '');
  const [accountIcon, setAccountIcon] = useState(account?.icon ?? 'Ifood');
  const [error, setError] = useState('');

  const handleAdd = () => {
    const sanitizedName = name.trim();
    const sanitizedBalance = balance.length === 0 ? 0 : parseFloat(balance);
    if (sanitizedName.length === 0) {
      setError('Nome da conta não pode ser vazio');
      return;
    }

    const newBankAccount: BankAccount = {
      name: sanitizedName,
      balance: sanitizedBalance,
      icon: accountIcon
    }

    if (account) {
      const existingAccount = bankAccounts.filter(bankAccount => bankAccount === account)[0];
      const newBankAccounts = [...bankAccounts.filter(bankAccount => bankAccount !== existingAccount), newBankAccount];
      setBankAccounts(newBankAccounts);
      props.navigation.pop();
      return;
    }

    const newBankAccounts = [...bankAccounts, newBankAccount];

    setBankAccounts(newBankAccounts);
    props.navigation.pop();
  }

  const handleDelete = () => {
    const newBankAccounts = bankAccounts.filter(bankAccount => bankAccount !== account);
    setBankAccounts(newBankAccounts);
    props.navigation.pop();
  }

  return (
    <LinearGradient style={styles.background} colors={['#000', '#000']} locations={[0.2, 0.2]}>
      <SafeAreaView style={styles.container}>
      
        <Text style={styles.text}>{
          account ? 'Edite entrada ou saida' : 'Adicione uma entrada ou saida'
        }</Text>
        <View style={styles.main}>
          <Box>
          <View style={styles.field}>
              <Text style={styles.subtitle}>Onde / Quem </Text>
              <TextInput
                style={styles.name}
                placeholder="Seu nome"
                onChangeText={setName}
              >
                {name}
              </TextInput>
            </View>
            <View style={styles.field}>
              <Text style={styles.subtitle}>Valor Gasto ou recebido</Text>
              <TextInput
                style={styles.name}
                placeholder="1.99" 
                keyboardType='numeric'
                onChangeText={setBalance}
              >
                {balance}
              </TextInput>
            </View>
            <HorizontalLine/>
            <ScrollView>
            <View style={styles.field}>
              <Text style={styles.subtitle}>Qual empresa</Text>
              <ScrollView style={styles.scrollView}>
              <FlatList style={styles.list} columnWrapperStyle={{flex: 1, justifyContent: 'space-around', margin: 10}} 
              key={'_'} numColumns={3} data={icons} renderItem={(icon)  => {
                return (
                    <TouchableOpacity onPress={() => setAccountIcon(icon.item.name)} style={styles.icon && (accountIcon === icon.item.name && styles.selected)}>
                      <Image source={icon.item.icon} style={styles.icon}/>
                    </TouchableOpacity>
                );
              }}/>
              </ScrollView>
            </View>
            </ScrollView>
          </Box>
            
        </View>
        
      </SafeAreaView>


      <SafeAreaView style={styles.safe} >
        <Box>
            {
              error.length > 0 && <Text style={styles.error}>{error}</Text>
            }
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText}>
              {
                account ? 'Editar' : 'Adicionar'
              }
            </Text>
          </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => account ? handleDelete() : props.navigation.pop()}>
              <Text style={styles.buttonText2}>
                {
                  account ? 'Excluir' : 'Cancelar'
                }
              </Text>
          </TouchableOpacity>
        </Box>
      </SafeAreaView>




      <StatusBar/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#993399',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700'
  },
  button2: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
    borderColor: '#ff4040',
    borderWidth: 1
  },
  buttonText2: {
    color: '#ff4040',
    fontWeight: '700'
  },
  selected : {
    borderColor: '#d75413',
    borderWidth: 4,
    borderRadius: 50,
  },
  list : {
    marginTop: 5,
  },
  icon: {
    borderRadius: 50,
    resizeMode: "contain",
    height: 50,
    width: 50
  },
  subtitle: {
    color: "#666",
    fontWeight: "400",
  },
  name: {
    fontWeight: "bold",
    fontSize: 17,
    backgroundColor: "#dddddd20",
    borderRadius: 10,
  },
  main: {
    width: '85%',
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
    marginTop: 50
  },
  error: {
    color: '#f00',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 20
  },
  scrollView: {
    width: '90%'
  },
  safe:{ 
    marginHorizontal: 50,
    marginBottom:1, 
    marginStart:10,
    marginEnd:10,
    marginTop:5,

  },

  
});
