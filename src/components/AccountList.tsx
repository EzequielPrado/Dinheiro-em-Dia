import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { AccountItem } from '../components/AccountItem';
import { BankAccount } from '../interfaces/BankAccount';
import { HorizontalLine } from './HorizontalLine';

interface AccountListProps {
  bankAccounts: BankAccount[];
  itemTouchCallback?: (bankAccount: BankAccount) => void;
}

export const AccountList = (props: AccountListProps) => {
  const { styles } = useStyle();

  return (
    <View style={styles.fullWidth}>
    <Text style={styles.bold}>{ !props.itemTouchCallback ? 'Minhas contas' : 'Selecione para editar uma conta' }</Text>
    {
      props.bankAccounts.length === 0 && <Text style={styles.noAccounts}>Sem contas cadastradas</Text>
    }
    <ScrollView>
      {
        props.bankAccounts.map((account, index) => 
          (
            <TouchableOpacity key={index} onPress={() => props.itemTouchCallback && props.itemTouchCallback(account)}>
              <AccountItem name={account.name} value={account.balance} icon={account.icon} />
              {
                index < props.bankAccounts.length - 1 && <HorizontalLine />
              }
            </TouchableOpacity>
          )
        )
      }
    </ScrollView>
  </View>
  );
}

const useStyle = () => {
  const { height } = useWindowDimensions();
  
  const styles = StyleSheet.create({
    fullWidth: {
      width: '100%',
      maxHeight: height - 320
    },
    bold: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 13
    },
    noAccounts: {
      color: '#666'
    }
  });

  return { styles }
}
