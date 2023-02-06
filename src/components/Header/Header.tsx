import React, { memo } from 'react';

import ButtonControls from './ButtonControls';
import styles from './Header.module.scss';
import HeaderNavbar from './HeaderNavbar';

function Header() {
  return (
    <header>
      <div className={styles.headerContent}>
        <HeaderNavbar />
        <ButtonControls />
      </div>
    </header>
  );
}

export default memo(Header);
