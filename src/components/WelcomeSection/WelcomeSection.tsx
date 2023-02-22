import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import styles from './WelcomeSection.module.scss';
import WelcomeSvg from './WelcomeSvg';

function WelcomeSection() {
  const { t } = useTranslation('translation', { keyPrefix: 'home' });

  return (
    <section className={styles.section}>
      <div className={styles.welcomeText}>
        <h1 className={styles.title}>{t('mainTitle')}</h1>
        <p className={styles.text}>{t('mainText')}</p>
        <NavLink to="/collections">
          <Button className="secondary-button">{t('browseButton')}</Button>
        </NavLink>
      </div>
      <div className={styles.welcomeImage}>
        <WelcomeSvg />
      </div>
    </section>
  );
}

export default memo(WelcomeSection);
