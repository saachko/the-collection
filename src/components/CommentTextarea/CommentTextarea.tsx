import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Card, Form, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IoMdSend } from 'react-icons/io';

import Loader from 'components/Loader/Loader';

import useCreateComment from 'hooks/useCreateComment';
import { useAppSelector } from 'hooks/useRedux';

import styles from './CommentTextarea.module.scss';

function CommentTextarea() {
  const { t } = useTranslation('translation', { keyPrefix: 'itemPage' });
  const [commentText, setCommentText] = useState('');
  const user = useAppSelector((state) => state.user.user);
  const { sendComment, isNewCommentLoading } = useCreateComment(
    commentText,
    setCommentText
  );

  const sendCommentOnEnter = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      sendComment();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', sendCommentOnEnter);

    return () => document.removeEventListener('keydown', sendCommentOnEnter);
  }, [commentText]);

  return (
    <>
      <Card body className={styles.card}>
        <div className={styles.container}>
          <div className={clsx('avatar-sm', styles.avatarWrapper)}>
            <div className="avatar-sm position-relative">
              <div className="avatar-sm loading-skeleton position-absolute" />
              <Image src={user?.avatar} className="avatar-sm position-absolute" />
            </div>
          </div>
          <Form.Control
            as="textarea"
            value={commentText}
            onChange={({ target }) => setCommentText(target.value)}
            placeholder={t('commentPlaceholder')}
          />
          <button
            type="button"
            className={styles.sendButton}
            disabled={!commentText}
            onClick={sendComment}
          >
            <IoMdSend />
          </button>
        </div>
      </Card>
      {isNewCommentLoading && <Loader />}
    </>
  );
}

export default CommentTextarea;
