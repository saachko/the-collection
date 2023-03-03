import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import TagsContainer from 'components/TagsContainer/TagsContainer';

import { useAppSelector } from 'hooks/useRedux';

function TagsSection() {
  const { t } = useTranslation('translation', { keyPrefix: 'home' });
  const popularTags = useAppSelector((state) => state.tag.popularTags);

  return (
    <section className="mb-4">
      <h3>{t('popularTags')}</h3>
      {popularTags && <TagsContainer tags={popularTags} />}
    </section>
  );
}

export default memo(TagsSection);
