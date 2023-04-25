import { createContext } from 'react';
import { BankAccount } from '../interfaces/BankAccount';
import { User } from '../interfaces/User';

const AppContext = createContext({
  user: {} as User,
  setUser: (user: User) => {},
  bankAccounts: [] as BankAccount[],
  setBankAccounts: (bankAccounts: BankAccount[]) => {},
  showBalance: false,
  setShowBalance: (showBalance: boolean) => {}
});

export default AppContext;
