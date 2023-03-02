import React, { memo } from 'react';
import { Card, CloseButton, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { formatDateAndTime } from 'utils/functions';

import useDeleteComment from 'hooks/useDeleteComment';
import { useAppSelector } from 'hooks/useRedux';

import { Comment } from 'ts/interfaces';

import styles from './CommentItem.module.scss';

interface CommentItemProps {
  comment: Comment;
}

function CommentItem({ comment }: CommentItemProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'itemPage' });
  const { isAdmin, isLoggedIn, user } = useAppSelector((state) => state.user);
  const { deleteComment } = useDeleteComment(comment._id);

  return (
    <Card body className={styles.card}>
      <div className="d-flex gap-3">
        <div className="avatar-sm position-relative">
          <div className="avatar-sm loading-skeleton position-absolute" />
          <Image src={comment.authorAvatar} className="avatar-sm position-absolute" />
        </div>
        <div>
          <p className={styles.author}>{comment.authorName}</p>
          <p className={styles.date}>
            {t('commentsOn')}
            {formatDateAndTime(comment, t, 'createdAt')}
          </p>
          <p className={styles.text}>{comment.text}</p>
        </div>
      </div>
      {((isAdmin && isLoggedIn) || user?._id === comment.authorId) && (
        <CloseButton className={styles.deleteButton} onClick={deleteComment} />
      )}
    </Card>
  );
}

export default memo(CommentItem);
