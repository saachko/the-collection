import React from 'react';
import { Spinner } from 'react-bootstrap';

import styles from './Loader.module.scss';

function Loader() {
  return (
    <div className={styles.background}>
      <Spinner
        animation="border"
        style={{
          width: '4rem',
          height: '4rem',
        }}
        className={styles.loader}
        role="status"
      />
    </div>
  );
}

export default Loader;
