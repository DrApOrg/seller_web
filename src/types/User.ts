export interface User {
  _id: string;
  firstname?: string;
  lastname?: string;
  username: string;
  password: string;
  image?: {
    key: string;
    location: string;
  };
  companyName: string;
  phone: number;
  address: string;
  listProducts?: string[];
}
