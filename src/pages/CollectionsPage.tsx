import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EmptyContainer from '../components/EmptyContainer/EmptyContainer';

function CollectionsPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });

  return <EmptyContainer text={t('empty')} />;
}

export default memo(CollectionsPage);
