import React from 'react';
import { useNavigate } from 'react-router-dom';

import { setFilterTag } from 'redux/slices/filterSlice';

import { useAppDispatch } from 'hooks/useRedux';

import { Tag } from 'ts/interfaces';

import styles from './TagsContainer.module.scss';

interface TagsContainerProps {
  tags: Tag[] | undefined;
}

function TagsContainer({ tags }: TagsContainerProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filterByTag = (tagId: string) => {
    dispatch(setFilterTag(tagId));
    navigate('/tags');
  };

  return (
    <div className="d-flex gap-2 flex-wrap justify-content-around mt-3 mb-3">
      {tags &&
        tags.length > 0 &&
        tags.map((tag) => (
          <div
            key={tag._id}
            className={styles.tag}
            onClick={() => filterByTag(tag._id)}
            aria-hidden="true"
          >
            {tag.label}
          </div>
        ))}
    </div>
  );
}

export default TagsContainer;
