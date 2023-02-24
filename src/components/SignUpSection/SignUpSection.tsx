import clsx from 'clsx';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { showModal } from 'redux/slices/modalAuthSlice';

import { useAppDispatch } from 'hooks/useRedux';

import styles from './SignUpSection.module.scss';

function SignUpSection() {
  const { t } = useTranslation('translation', { keyPrefix: 'home' });
  const dispatch = useAppDispatch();

  return (
    <div className={clsx('d-flex flex-column align-items-start gap-2', styles.container)}>
      <h2>{t('noAccount')}</h2>
      <Button className="primary-button" onClick={() => dispatch(showModal('signUp'))}>
        {t('signup')}
      </Button>
    </div>
  );
}

export default SignUpSection;
