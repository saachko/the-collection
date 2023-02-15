interface NavLink {
  id: string;
  name: string;
  path: string;
}

interface Contact {
  id: string;
  link: string;
  icon: JSX.Element;
  title: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  roles: string[];
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserAuthFormValues {
  username?: string;
  email: string;
  password: string;
}

interface UserResponse {
  user: User;
  token: string;
}

interface Token {
  token: string;
  id: string;
}

interface ParsedToken {
  id: string;
  roles: string[];
  isBlocked: boolean;
  iat: number;
  exp: number;
}

export type {
  NavLink,
  Contact,
  User,
  UserAuthFormValues,
  UserResponse,
  Token,
  ParsedToken,
};
