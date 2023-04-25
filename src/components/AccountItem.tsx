import { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { formatNumber } from '../components/Utils';
import AppContext from '../contexts/AppContext';
import { icons } from '../shared/icons';

interface AccountItemProps {
  name: string;
  value: number;
  icon: string;
}

export const AccountItem = (props: AccountItemProps) => {
  const { showBalance } = useContext(AppContext);
  const iconImage = icons.find(i => i.name === props.icon).icon;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={iconImage}></Image>
      <View>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.description}>Conta corrente</Text>
      </View>
      <Text style={styles.balance}>
      {
        showBalance ? formatNumber(props.value) : 'R$ ----'
      }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    borderRadius: 50,
    resizeMode: 'contain',
    height: 50,
    width: 50,
    backgroundColor: '#4dff7f',
    marginRight: 20
  },
  name: {
    fontWeight: '500'
  },
  balance: {
    marginLeft: 'auto',
    fontWeight: 'bold',
    color: '#04b8aa',
    marginTop: 15 
  },
  description: {
    color: '#666',
  }
});
