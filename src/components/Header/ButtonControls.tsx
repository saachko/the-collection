import React, { memo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { showModal } from 'redux/slices/modalAuthSlice';
import { setLoggedOut } from 'redux/slices/userSlice';

import ConfirmNotification from 'components/ConfirmNotification/ConfirmNotification';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

function ButtonControls() {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const [confirmLogOutNotification, setConfirmLogOutNotification] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div>
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
    <div>
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
        onConfirm={() => dispatch(setLoggedOut())}
        text={t('confirmLogOut')}
      />
    </div>
  );
}

export default memo(ButtonControls);
