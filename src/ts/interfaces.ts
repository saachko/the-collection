import { SortTypes } from './types';

interface DatabaseModel {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

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

interface User extends DatabaseModel {
  username: string;
  email: string;
  password: string;
  avatar: string;
  roles: string[];
  isBlocked: boolean;
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

interface CollectionFormValues {
  title: string;
  description: string;
  theme: string;
  image: string;
}

interface CollectionRequestBody extends CollectionFormValues {
  ownerId: string;
  ownerName: string;
}

interface Collection extends DatabaseModel, CollectionRequestBody {
  itemsQuantity: number;
}

interface CustomFieldFormValues {
  type: string;
  label: string;
}

interface CustomFieldRequestBody extends CustomFieldFormValues {
  collectionId: string;
}

interface CustomField extends DatabaseModel, CustomFieldRequestBody {}

interface CustomFieldInItem {
  customFieldId: string;
  label: string;
  value: string;
}

interface ItemFormValues {
  itemName: string;
  customFields: CustomFieldInItem[];
}

interface ItemRequestBody extends ItemFormValues {
  collectionId: string;
  collectionName: string;
  collectionTheme: string;
  ownerId: string;
  ownerName: string;
}

interface Item extends DatabaseModel, ItemRequestBody {
  likes: string[];
}

interface TagRequestBody {
  label: string;
  items: string[];
}

interface Tag extends DatabaseModel, TagRequestBody {}

interface CommentRequestBody {
  itemId: string;
  authorId: string;
  authorName: string;
  text: string;
}

interface Comment extends DatabaseModel, CommentRequestBody {}

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
  CollectionRequestBody,
  CollectionFormValues,
  CustomField,
  CustomFieldRequestBody,
  CustomFieldFormValues,
  Item,
  ItemRequestBody,
  ItemFormValues,
  Tag,
  TagRequestBody,
  Comment,
  CommentRequestBody,
};
