export interface IUser {
  id: number;
  token?: string;
  googleId: string;
  email: string;
  fullName: string;
  role: string;
  location: string;
  imageUrl: string;
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
  id?: number;
  name: string;
}

export interface ILocation {
  id?: number;
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
  id: string;
}

export type ContextType = {
  user: IUser;
  userId : number | undefined;
  users: IUser[];
  profile: IProfile;
  groups: IGroup[];
  assignments: IAssignment[];
  setUser: (user: IUser) => void;
  setProfile: (profile: IProfile) => void;
  setGroups: (groups: IGroups[]) => void;
  setUpdate: (update: boolean) => void;
  setUserId: (userId: number) => void;
};
