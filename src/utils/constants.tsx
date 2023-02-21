import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiTwotoneMail } from 'react-icons/ai';
import { BsSortAlphaDown, BsSortAlphaUp, BsSortDown, BsSortUp } from 'react-icons/bs';
import { FaTelegramPlane } from 'react-icons/fa';
import { GroupBase, StylesConfig } from 'react-select';

import {
  Contact,
  NavLink,
  SelectOption,
  SortButton,
  TableHeading,
  UserAuthFormValues,
} from 'ts/interfaces';
import { CustomFieldTypes } from 'ts/types';

const navLinks: NavLink[] = [
  {
    id: '1',
    name: 'header.home',
    path: '/',
  },
  {
    id: '2',
    name: 'header.collections',
    path: '/collections',
  },
];

const privateLink: NavLink = {
  id: '3',
  name: 'header.users',
  path: '/users',
};

const authorsContacts: Contact[] = [
  {
    id: '1',
    link: 'https://github.com/saachko',
    icon: <AiFillGithub />,
    title: 'Anastasiya on GitHub',
  },
  {
    id: '2',
    link: 'https://t.me/saachko',
    icon: <FaTelegramPlane />,
    title: 'Send a message',
  },
  {
    id: '3',
    link: 'https://www.linkedin.com/in/saachko/',
    icon: <AiFillLinkedin />,
    title: 'Anastasiya on LinkedIn',
  },
  {
    id: '4',
    link: 'mailto:naztya12323@gmail.com',
    icon: <AiTwotoneMail />,
    title: 'Send an e-mail',
  },
];

const defaultUserFormValues: UserAuthFormValues = {
  username: '',
  email: '',
  password: '',
};

const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const imageFileTypes = ['JPEG', 'JPG', 'PNG', 'GIF'];

const userAvatarBaseUrl = 'https://source.boringavatars.com/beam/';

const usersTableHeadings: TableHeading[] = [
  {
    id: '1',
    headingName: '#',
  },
  {
    id: '2',
    headingName: 'id',
  },
  {
    id: '3',
    headingName: 'username',
  },
  {
    id: '4',
    headingName: 'email',
  },
  {
    id: '5',
    headingName: 'createdAt',
  },
];

const sortButtons: SortButton[] = [
  {
    id: 'fromAtoZ',
    icon: <BsSortAlphaDown />,
    tooltip: 'aZ',
  },
  {
    id: 'fromZtoA',
    icon: <BsSortAlphaUp />,
    tooltip: 'zA',
  },
  {
    id: 'fromOldToNew',
    icon: <BsSortUp />,
    tooltip: 'oldNew',
  },
  {
    id: 'fromNewToOld',
    icon: <BsSortDown />,
    tooltip: 'newOld',
  },
];

const collectionThemes = [
  'books',
  'vinyl',
  'movies',
  'comics',
  'toys',
  'flowers',
  'cosmetics',
  'antiques',
  'autographs',
  'souvenirs',
  'coins',
  'stamps',
  'calendars',
  'pictures',
  'other',
];

const selectStyles: StylesConfig<
  string | SelectOption,
  boolean,
  GroupBase<SelectOption>
> = {
  control: (base, { isFocused }) => ({
    ...base,
    border: isFocused ? `1px solid var(--primary-color)` : ``,
    boxShadow: isFocused
      ? `${
          localStorage.getItem('app-theme') === 'light'
            ? `0 0 0 0.25rem #f9dbcf`
            : `0 0 0 0.25rem #f9dbcfb5`
        }`
      : 'none',
    '&:hover': {
      border: isFocused ? `1px solid var(--primary-color)` : ``,
    },
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? 'var(--secondary-color-light)' : '',
    transition: 'all 0.2s ease-out',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: isFocused ? '#adb6c2' : '',
    },
  }),
};

const customFieldsTypes: CustomFieldTypes[] = [
  'number',
  'string',
  'text',
  'date',
  'checkbox',
];

export {
  navLinks,
  privateLink,
  authorsContacts,
  emailValidation,
  defaultUserFormValues,
  imageFileTypes,
  userAvatarBaseUrl,
  usersTableHeadings,
  sortButtons,
  collectionThemes,
  selectStyles,
  customFieldsTypes,
};
