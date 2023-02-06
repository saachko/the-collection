import React from 'react';

import styles from './Logo.module.scss';
import LogoSvg from './LogoSvg';

function Logo() {
  return (
    <div className="d-flex align-items-center">
      <LogoSvg />
      <p className={styles.logoTitle}>The Collection</p>
    </div>
  );
}

export default Logo;
