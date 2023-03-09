import clsx from 'clsx';
import React, { useState } from 'react';
import { Card, CloseButton, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { setSelectedUser } from 'redux/slices/adminSlice';

import ConfirmNotification from 'components/ConfirmNotification/ConfirmNotification';

import { formatDateAndTime } from 'utils/functions';

import useDeleteComment from 'hooks/useDeleteComment';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { Comment } from 'ts/interfaces';

import styles from './CommentItem.module.scss';

interface CommentItemProps {
  comment: Comment;
}

function CommentItem({ comment }: CommentItemProps) {
  const [confirmDeleteNotification, setConfirmDeleteNotification] = useState(false);
  const [deletionConfirmed, setDeletionConfirmed] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'itemPage' });
  const { isAdmin, isLoggedIn, user } = useAppSelector((state) => state.user);
  const { deleteComment } = useDeleteComment(comment._id);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const confirmDeletion = () => {
    setConfirmDeleteNotification(false);
    setDeletionConfirmed(true);
    setTimeout(() => {
      deleteComment();
    }, 300);
  };

  const navigateToUserPage = () => {
    if (isAdmin && isLoggedIn) {
      dispatch(setSelectedUser(null));
      navigate(`/users/${comment.authorId}`);
    }
  };

  return (
    <>
      <Card
        body
        className={clsx(styles.card, {
          [styles.deletedComment]: deletionConfirmed,
        })}
      >
        <div className="d-flex gap-3">
          <div className="avatar-sm">
            <div
              className={clsx('avatar-sm position-relative', {
                [styles.linkToUser]: isAdmin && isLoggedIn,
              })}
              onClick={navigateToUserPage}
              aria-hidden="true"
            >
              <div className="avatar-sm loading-skeleton position-absolute" />
              <Image src={comment.authorAvatar} className="avatar-sm position-absolute" />
            </div>
          </div>
          <div>
            <p
              className={clsx(styles.author, {
                [styles.linkToUser]: isAdmin && isLoggedIn,
              })}
              onClick={navigateToUserPage}
              aria-hidden="true"
            >
              {comment.authorName}
            </p>
            <p className={styles.date}>
              {t('commentsOn')}
              {formatDateAndTime(comment, t, 'createdAt')}
            </p>
            <p className={styles.text}>{comment.text}</p>
          </div>
        </div>
        {((isAdmin && isLoggedIn) || user?._id === comment.authorId) && (
          <CloseButton
            className={styles.deleteButton}
            onClick={() => setConfirmDeleteNotification(true)}
          />
        )}
      </Card>
      <ConfirmNotification
        isShown={confirmDeleteNotification}
        setShown={setConfirmDeleteNotification}
        onConfirm={confirmDeletion}
        text={t('commentDeleteConfirm')}
      />
    </>
  );
}

export default CommentItem;
