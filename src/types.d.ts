export interface IUser {
  id: number;
  googleId: string;
  email: string;
  fullName: string;
  role: string;
  location: string;
  imageURL: string;
  status: string;
  groups: number[];
}

export interface IGroup {
  id: number;
  name: string;
  users: IUser[];
  assignments: IAssignment[];
}

export interface IAssignment {
  id: number;
  title: string;
  startDate: string;
  description: string;
}

export interface IProfile {
  email: string;
  name: string;
  picture: string;
  googleId: string;
}

export type ContextType = {
  user: IUser;
  assignments: IAssignment[];
  setUser: (user: IUser) => void;

  // cart: IProductToOrder[]
  // addToCart: (product: IProduct, quantity: number) => void
  // submitCart: (cart: IProductToOrder[] ) => void
};

//  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>,
