import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { showModal } from 'redux/slices/modalAuthSlice';

import { useAppDispatch } from 'hooks/useRedux';

function ButtonControls() {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const dispatch = useAppDispatch();

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

export default memo(ButtonControls);
