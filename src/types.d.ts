export type UserType = {
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

export type UserGroup ={
  id: number;
  name: string;
}

export type UserGroups = {
  groupsId: number;
  name: string;
}
export type AssignmentGroup ={
  groupsId: number;
  title: string;
}

export type GroupType = {
  id: number;
  name: string;
  users: IUserGroup[];
  assignmentsId: IAssignmentGroup[];
}

export type Role = {
  id?: number;
  name: string;
}

export type Location = {
  id?: number;
  name: string;
}

export type AssignmentType = {
  id: number | undefined;
  title: string;
  startDate: string;
  description: string;
  groupId: number | undefined;
}

export type Submission = {
  userId: number;
  name: string;
  repo: string;
}

export type Option = {
  label: string;
  value: string;
}

export type ProfileType = {
  email: string;
  name: string;
  picture: string;
  id: string;
}

export type Response = {
  access_token: string;
  authuser?: string;
  expires_in: number;
  hd?: string;
  prompt: string;
  scope: string;
  token_type: string;
}

export type RepoType = {
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
  userGoogleToken?: IResponse;
  setUser: (user: IUser) => void;
  setUsers: (users: IUser[]) => void;
  setAssignments: (assignments: IAssignment[]) => void;
  setProfile: (profile: IProfile) => void;
  setGroups: (groups: IGroups[]) => void;
  setUpdate: (update: boolean) => void;
  setUserGoogleToken: (userGoogleToken?: IResponse) => void;
};
