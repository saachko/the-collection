import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { setSelectedUser } from 'redux/slices/adminSlice';
import { setDefaultUsersFilters } from 'redux/slices/filterSlice';
import { showModal } from 'redux/slices/modalAuthSlice';
import { setDefaultUsersSorting } from 'redux/slices/sortSlice';
import { setLoggedOut } from 'redux/slices/userSlice';

import ConfirmNotification from 'components/ConfirmNotification/ConfirmNotification';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import styles from './Header.module.scss';

function ButtonControls() {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const [confirmLogOutNotification, setConfirmLogOutNotification] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(setSelectedUser(null));
    dispatch(setDefaultUsersSorting());
    dispatch(setDefaultUsersFilters());
    dispatch(setLoggedOut());
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.buttonControls}>
        <Button
          className="secondary-button me-2"
          onClick={() => dispatch(showModal('signIn'))}
        >
          {t('signin')}
        </Button>
        <Button className="primary-button" onClick={() => dispatch(showModal('signUp'))}>
          {t('signup')}
        </Button>
      </div>
    );
  }
  return (
    <div className={styles.buttonControls}>
      <Button
        className="secondary-button me-2"
        onClick={() => setConfirmLogOutNotification(true)}
      >
        {t('logout')}
      </Button>
      <Button className="primary-button" onClick={() => navigate('/profile')}>
        {t('profile')}
      </Button>
      <ConfirmNotification
        isShown={confirmLogOutNotification}
        setShown={setConfirmLogOutNotification}
        onConfirm={logOut}
        text={t('confirmLogOut')}
      />
    </div>
  );
}

export default ButtonControls;
