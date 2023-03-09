import clsx from 'clsx';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import Logo from 'components/Logo/Logo';

import { navLinks, privateLink } from 'utils/constants';

import { useAppSelector } from 'hooks/useRedux';

import styles from './Header.module.scss';

function HeaderNavbar() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useTranslation('translation');

  return (
    <Navbar className={styles.headerNav}>
      <Container className="p-0 justify-content-center justify-content-sm-between">
        <Logo />
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
              {t(link.name)}
            </NavLink>
          ))}
          {isLoggedIn && isAdmin && (
            <NavLink
              to={privateLink.path}
              end
              className={clsx(styles.headerNavLink, {
                [styles.active]: currentPath === privateLink.path,
              })}
            >
              {t(privateLink.name)}
            </NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default HeaderNavbar;
