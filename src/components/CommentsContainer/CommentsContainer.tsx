import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';

import { useAppSelector } from 'hooks/useRedux';

import CommentItem from './CommentItem';

function CommentsContainer() {
  const { t } = useTranslation('translation', { keyPrefix: 'itemPage' });
  const commentsToItem = useAppSelector((state) => state.item.commentsToItem);

  return (
    <div className="d-flex flex-column gap-2 mt-3 mb-3">
      {commentsToItem && commentsToItem.length ? (
        commentsToItem.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))
      ) : (
        <EmptyContainer title={t('noComments')} text="" />
      )}
    </div>
  );
}

export default memo(CommentsContainer);
