import clsx from 'clsx';
import React, { useState } from 'react';
import { Nav, Offcanvas } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { RxHamburgerMenu } from 'react-icons/rx';
import { NavLink, useLocation } from 'react-router-dom';

import { setSelectedUser } from 'redux/slices/adminSlice';
import { setDefaultUsersFilters } from 'redux/slices/filterSlice';
import { showModal } from 'redux/slices/modalAuthSlice';
import { setDefaultUsersSorting } from 'redux/slices/sortSlice';
import { setLoggedOut } from 'redux/slices/userSlice';

import ConfirmNotification from 'components/ConfirmNotification/ConfirmNotification';

import {
  burgerMenuLinks,
  burgerMenuLinksLoggedIn,
  navLinks,
  privateLink,
} from 'utils/constants';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import styles from './BurgerMenu.module.scss';

function BurgerMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [confirmLogOutNotification, setConfirmLogOutNotification] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const isAdmin = useAppSelector((state) => state.user.isAdmin);
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation');

  const handleOnClick = (
    actionId: string,
    path?: string,
    event?: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!path) {
      event?.preventDefault();
    }
    switch (actionId) {
      case 'signin': {
        dispatch(showModal('signIn'));
        break;
      }
      case 'signup': {
        dispatch(showModal('signUp'));
        break;
      }
      case 'logout': {
        setConfirmLogOutNotification(true);
        break;
      }
      case 'submitLogout': {
        dispatch(setSelectedUser(null));
        dispatch(setDefaultUsersSorting());
        dispatch(setDefaultUsersFilters());
        dispatch(setLoggedOut());
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.menuButton}
        onClick={() => setShowMenu(true)}
      >
        <RxHamburgerMenu />
      </button>
      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="end">
        <Offcanvas.Header closeButton className="d-flex justify-content-end pt-4 me-4" />
        <Offcanvas.Body>
          <Nav className="d-flex flex-column gap-2" onClick={() => setShowMenu(false)}>
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                end
                className={clsx(styles.burgerNavLink, {
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
                className={clsx(styles.burgerNavLink, {
                  [styles.active]: currentPath === privateLink.path,
                })}
              >
                {t(privateLink.name)}
              </NavLink>
            )}
            {(isLoggedIn ? burgerMenuLinksLoggedIn : burgerMenuLinks).map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                end
                className={clsx(styles.burgerNavLink, {
                  [styles.active]: currentPath === link.path,
                })}
                onClick={(event) => handleOnClick(link.id, link.path, event)}
              >
                {t(link.name)}
              </NavLink>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <ConfirmNotification
        isShown={confirmLogOutNotification}
        setShown={setConfirmLogOutNotification}
        onConfirm={() => handleOnClick('submitLogout')}
        text={t('header.confirmLogOut')}
      />
    </>
  );
}

export default BurgerMenu;
