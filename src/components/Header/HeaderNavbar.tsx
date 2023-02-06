import clsx from 'clsx';
import React, { memo } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import { navLinks } from '../../utils/constants';
import Logo from '../Logo/Logo';
import styles from './Header.module.scss';

function HeaderNavbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useTranslation('translation');

  return (
    <Navbar>
      <Container className="p-0">
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>
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
        </Nav>
      </Container>
    </Navbar>
  );
}

export default memo(HeaderNavbar);
