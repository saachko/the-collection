import NavLink from 'ts/interfaces';

const navLinks: NavLink[] = [
  {
    id: '1',
    name: 'Home',
    path: '/',
  },
  {
    id: '2',
    name: 'Collections',
    path: '/collections',
  },
];

const privateLink: NavLink = {
  id: '3',
  name: 'Users',
  path: '/users',
};

export { navLinks, privateLink };
