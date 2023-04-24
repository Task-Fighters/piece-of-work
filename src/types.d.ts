export interface IUser {
  id: number;
  googleId: string;
  email: string;
  fullName: string;
  role: string;
  location: string;
  imageURL: string;
  status: string;
  groups: IUserGroups[];
}
export interface IUserGroups {
  groupsId: number;
  name: string;
}

export interface IGroup {
  id: number;
  name: string;
  users: IUser[];
  assignments: IAssignment[];
}

export interface IRole {
  id: number;
  name: string;
}

export interface ILocation {
  id: number;
  name: string;
}

export interface IAssignment {
  id: number;
  title: string;
  startDate: string;
  description: string;
  submission: ISubmission[];
}

export interface ISubmission {
  userId: number;
  name: string;
  repo: string;
}

export interface IProfile {
  email: string;
  name: string;
  picture: string;
  googleId: string;
}

export type ContextType = {
  user: IUser;
  users: IUser[];
  groups: IGroup[];
  assignments: IAssignment[];
  setUser: (user: IUser) => void;
};
