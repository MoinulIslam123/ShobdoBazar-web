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
  id:number;
}