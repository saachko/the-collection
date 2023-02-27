import React, { memo } from 'react';

import { Tag } from 'ts/interfaces';

import styles from './TagsContainer.module.scss';

interface TagsContainerProps {
  tags: Tag[] | undefined;
}

function TagsContainer({ tags }: TagsContainerProps) {
  return (
    <div className="d-flex flex-wrap justify-content-around mt-3 mb-3">
      {tags &&
        tags.length > 0 &&
        tags.map((tag) => (
          <div key={tag._id} className={styles.tag}>
            {tag.label}
          </div>
        ))}
    </div>
  );
}

export default memo(TagsContainer);
