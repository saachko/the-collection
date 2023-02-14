import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { showModal } from 'redux/slices/modalAuthSlice';
import { setLoggedOut } from 'redux/slices/userSlice';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

function ButtonControls() {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const { isLoggedIn } = useAppSelector((state) => state.user);
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
      <Button className="secondary-button me-2" onClick={() => dispatch(setLoggedOut())}>
        {t('logout')}
      </Button>
      <Button className="primary-button" onClick={() => navigate('/profile')}>
        {t('profile')}
      </Button>
    </div>
  );
}

export default memo(ButtonControls);
