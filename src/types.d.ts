export interface IUser {
  id: number;
  token?: string;
  googleId?: string;
  email: string;
  fullName: string;
  bootcamp: string;
  role: string;
  location: string;
  imageUrl: string;
  status: string;
  groupsId: number[];
}

export interface IUserGroup {
  id: number;
  name: string;
}

export interface IUserGroups {
  groupsId: number;
  name: string;
}
export interface IAssignmentGroup {
  groupsId: number;
  title: string;
}

export interface IGroup {
  id: number;
  name: string;
  users: IUserGroup[];
  assignmentsId: IAssignmentGroup[];
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
  id: number | undefined;
  title: string;
  startDate: string;
  description: string;
  groupId: number | undefined;
}

export interface ISubmission {
  userId: number;
  name: string;
  repo: string;
}

export interface IOption {
  label: string;
  value: string;
}

export interface IProfile {
  email: string;
  name: string;
  picture: string;
  id: string;
}

export interface IResponse {
  access_token: string;
  authuser?: string;
  expires_in: number;
  hd?: string;
  prompt: string;
  scope: string;
  token_type: string;
}

interface IRepo {
  id: number;
  assignmentId: number;
  assignment: string;
  url: string;
  title: string;
}

export type ContextType = {
  user: IUser;
  users: IUser[];
  profile: IProfile;
  groups: IGroup[];
  assignments: IAssignment[];
  // isLoggedIn: boolean;
  userGoogleToken?: IResponse;
  setUser: (user: IUser) => void;
  setUsers: (users: IUser[]) => void;
  setAssignments: (assignments: IAssignment[]) => void;
  setProfile: (profile: IProfile) => void;
  setGroups: (groups: IGroups[]) => void;
  setUpdate: (update: boolean) => void;
  // setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUserGoogleToken: (userGoogleToken?: IResponse) => void;
};
