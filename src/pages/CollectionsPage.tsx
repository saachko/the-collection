import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EmptyContainer from 'components/EmptyContainer/EmptyContainer';

import { useAppSelector } from 'hooks/useRedux';

function CollectionsPage() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });

  return (
    <EmptyContainer
      title={t('empty')}
      text={isLoggedIn ? `${t('emptyAndLoggedIn')}` : `${t('emptyAndLoggedOut')}`}
    />
  );
}

export default memo(CollectionsPage);
