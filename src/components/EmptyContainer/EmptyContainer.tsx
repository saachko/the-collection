import React, { memo } from 'react';

import styles from './EmptyContainer.module.scss';

interface EmptyContainerProps {
  title: string;
  text: string;
}

function EmptyContainer({ title, text }: EmptyContainerProps) {
  return (
    <div className="content text-center mt-4 mb-5">
      <h2 className={styles.title}>{title}</h2>
      <h2 className={styles.title}>{text}</h2>
    </div>
  );
}

export default memo(EmptyContainer);
