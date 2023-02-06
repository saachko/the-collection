import NavLink from 'ts/interfaces';

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

export { navLinks, privateLink };
