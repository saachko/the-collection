import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import WelcomeSvg from './WelcomeSvg';

function WelcomeSection() {
  const { t } = useTranslation('translation', { keyPrefix: 'home' });

  return (
    <section className="d-flex justify-content-between gap-2">
      <div className="w-50 ms-5 align-self-center mt--10">
        <h1>{t('mainTitle')}</h1>
        <p>{t('mainText')}</p>
        <NavLink to="/collections">
          <Button className="secondary-button">{t('browseButton')}</Button>
        </NavLink>
      </div>
      <WelcomeSvg />
    </section>
  );
}

export default memo(WelcomeSection);
