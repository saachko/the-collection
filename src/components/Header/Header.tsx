import React, { memo } from 'react';

import BurgerMenu from 'components/BurgerMenu/BurgerMenu';

import ButtonControls from './ButtonControls';
import styles from './Header.module.scss';
import HeaderNavbar from './HeaderNavbar';
import LanguageSwitcher from './LanguageSwitcher';
import SearchButton from './SearchButton';
import ThemeSwitcher from './ThemeSwitcher';

function Header() {
  return (
    <header>
      <div className={styles.headerContent}>
        <HeaderNavbar />
        <div className={styles.controls}>
          <ThemeSwitcher />
          <SearchButton />
          <LanguageSwitcher />
          <ButtonControls />
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
