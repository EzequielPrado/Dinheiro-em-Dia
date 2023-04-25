import { View, StyleSheet } from 'react-native';

export const HorizontalLine = () => <View style={styles.line}/>

const styles = StyleSheet.create({
  line: {
    backgroundColor: '#00000030',
    height: 1,
    width: '100%',
    marginVertical: 15
  }
});