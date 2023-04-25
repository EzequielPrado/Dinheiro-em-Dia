import { View, Text, StyleSheet } from 'react-native';
import { BankAccount } from '../interfaces/BankAccount';
import { formatNumber } from '../components/Utils';
import { useContext } from 'react';
import AppContext from '../contexts/AppContext';

interface TotalBalanceProps {
  bankAccounts: BankAccount[];
}

export const TotalBalance = (props: TotalBalanceProps) => {
  const { showBalance } = useContext(AppContext);

  const value = props.bankAccounts.reduce((acc, account) => acc + account.balance, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Saldo geral</Text>
      <Text style={styles.bold}>
      {
        showBalance ? formatNumber(value) : 'R$ ----'
      }
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex'
  },
  text: {
    color: '#666',
    fontWeight: '400'
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 17
  }
});