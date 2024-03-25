export interface SignUp{
    name:string,
    password:string,
    email:string,
}

export interface Login {
  email: string;
  password: string;
}

export interface book {
  name: string;
  price: number;
  date: Date;
  category: string;
  description: string;
  image: string;
  id: number;
  quantity: undefined | number;
  bookId: undefined | number;
}

export interface cart {
  name: string;
  price: number;
  date: Date;
  category: string;
  description: string;
  image: string;
  id: number | undefined;
  quantity: undefined | number;
  userId: number;
  bookId: number;
}

export interface priceSummary {
  price: number;
  discount: number;
  tax: number;
  delivery: number;
  total: number;
}

export interface order {
  email: string;
  address: string;
  contact: string;
  totalPrice: number;
  userId: string;
  id: number | undefined;
}