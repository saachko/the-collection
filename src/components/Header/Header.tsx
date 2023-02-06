import React, { memo } from 'react';

import ButtonControls from './ButtonControls';
import styles from './Header.module.scss';
import HeaderNavbar from './HeaderNavbar';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

function Header() {
  return (
    <header>
      <div className={styles.headerContent}>
        <HeaderNavbar />
        <div className="d-flex align-items-center gap-3">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <ButtonControls />
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
