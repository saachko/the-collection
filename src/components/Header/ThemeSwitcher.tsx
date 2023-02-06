import React from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

import useTheme from '../../hooks/useTheme';
import styles from './Header.module.scss';

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const switchLightTheme = () => {
    setTheme('light');
  };

  const switchDarkTheme = () => {
    setTheme('dark');
  };

  return (
    <div>
      {theme === 'light' ? (
        <button type="button" className={styles.themeButton} onClick={switchDarkTheme}>
          <BsFillSunFill style={{ color: 'var(--primary-color)', fontSize: '35px' }} />
        </button>
      ) : (
        <button type="button" className={styles.themeButton} onClick={switchLightTheme}>
          <BsFillMoonFill
            style={{ color: 'var(--secondary-color-light)', fontSize: '30px' }}
          />
        </button>
      )}
    </div>
  );
}

export default ThemeSwitcher;
