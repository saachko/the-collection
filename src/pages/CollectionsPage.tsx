import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';

import { useAppSelector } from 'hooks/useRedux';

function CollectionsPage() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });

  return (
    <EmptyContainer text={isLoggedIn ? `${t('empty')}` : `${t('emptyAndLogOut')}`} />
  );
}

export default memo(CollectionsPage);
