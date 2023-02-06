import clsx from 'clsx';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';

import { navLinks } from '../../utils/constants';
import styles from './Header.module.scss';

function HeaderNavbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Navbar>
      <Container className="p-0">
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Nav className="d-flex gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              end
              className={clsx(styles.headerNavLink, {
                [styles.active]: currentPath === link.path,
              })}
            >
              {link.name}
            </NavLink>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default HeaderNavbar;
