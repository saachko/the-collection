import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import useWindowSize from 'hooks/useWindowSize';

import styles from './WelcomeSection.module.scss';
import WelcomeSvg from './WelcomeSvg';

function WelcomeSection() {
  const { t } = useTranslation('translation', { keyPrefix: 'home' });
  const [verticalScreen, setVerticalScreen] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width <= windowSize.height) {
      setVerticalScreen(true);
    } else {
      setVerticalScreen(false);
    }
  }, [windowSize]);

  return (
    <section className={styles.section}>
      <div className={styles.welcomeText}>
        <h1 className={styles.title}>{t('mainTitle')}</h1>
        <p className={styles.text}>{t('mainText')}</p>
        <NavLink to="/collections">
          <Button className="secondary-button">{t('browseButton')}</Button>
        </NavLink>
      </div>
      <div
        className={clsx(styles.welcomeImage, {
          [styles.verticalScreenImage]: verticalScreen,
        })}
      >
        <WelcomeSvg />
      </div>
    </section>
  );
}

export default memo(WelcomeSection);
