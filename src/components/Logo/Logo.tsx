import React, { useCallback } from 'react';
import { Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import styles from './Logo.module.scss';
import LogoSvg from './LogoSvg';

function Logo() {
  const navigate = useNavigate();
  const clickOnLogo = useCallback((event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    navigate('/');
  }, []);

  return (
    <Navbar.Brand href="/" onClick={(event) => clickOnLogo(event)}>
      <div className="d-flex align-items-center">
        <LogoSvg />
        <p className={styles.logoTitle}>The Collection</p>
      </div>
    </Navbar.Brand>
  );
}

export default Logo;
