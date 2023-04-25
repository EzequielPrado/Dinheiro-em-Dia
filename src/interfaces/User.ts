import { BankAccount  } from './BankAccount';

export interface User {
  name: string;
  email: string;
  password: string;
  cep: string;
  streetName: string;
  profilePicture: string;
  bankAccounts: BankAccount[];
  setBankAccounts: (bankAccounts: BankAccount[]) => void;
}
  