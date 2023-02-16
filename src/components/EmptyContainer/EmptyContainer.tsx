import React, { memo } from 'react';

import styles from './EmptyContainer.module.scss';

interface EmptyContainerProps {
  text: string;
}

function EmptyContainer({ text }: EmptyContainerProps) {
  return (
    <div className="content text-center mt-10">
      <h2 className={styles.title}>{text}</h2>
    </div>
  );
}

export default memo(EmptyContainer);
