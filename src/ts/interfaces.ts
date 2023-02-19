import { SortTypes } from './types';

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

interface EditDropdownItem {
  id: string;
  title: string;
  action: () => void;
}

interface UpdateUserFormValues {
  username: string;
  email: string;
  avatar: string;
}

interface TableHeading {
  id: string;
  headingName: string;
}

interface SortButton {
  id: SortTypes;
  icon: JSX.Element;
  tooltip: string;
}

interface Collection {
  _id: string;
  title: string;
  description: string;
  theme: string;
  image: string;
  ownerId: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}

interface CollectionFormValues {
  title: string;
  description: string;
  theme: string;
  image: string;
  ownerId: string;
  ownerName: string;
}

export type {
  NavLink,
  Contact,
  User,
  UserAuthFormValues,
  UserResponse,
  Token,
  ParsedToken,
  EditDropdownItem,
  UpdateUserFormValues,
  TableHeading,
  SortButton,
  Collection,
  CollectionFormValues,
};
