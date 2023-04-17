export interface IUser {
  id: number;
  googleId: string;
  email: string;
  fullName: string;
  role: string;
  location: string;
  imageURL: string;
  status: string;
  groups: IGroup[];
}

export interface IGroup{
  id: number;
  name: string;
  users: string;
  assignments: IAssignments[];
}

export interface IAssignments {
  id: number;
  title: string;
  startDate: string;
  description: string;
  group: string;
}



export type ContextType = {
  user: IUser | undefined;
  // cart: IProductToOrder[]
  // addToCart: (product: IProduct, quantity: number) => void
  // submitCart: (cart: IProductToOrder[] ) => void
};


{
    "id": 0,
    "googleId": "string",
    "email": "string",
    "fullName": "string",
    "role": "string",
    "location": "string",
    "imageUrl": "string",
    "status": "string",
    "groups": [
      {
        "id": 0,
        "name": "string",
        "users": [
          "string"
        ],
        "assignments": [
          {
            "id": 0,
            "title": "string",
            "startDate": "2023-04-17T09:08:08.227Z",
            "description": "string",
            "group": "string"
          }
        ]
      }
    ]
  }