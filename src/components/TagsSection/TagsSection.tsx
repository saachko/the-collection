import React from 'react';
import { useTranslation } from 'react-i18next';

import TagsContainer from 'components/TagsContainer/TagsContainer';

import { useAppSelector } from 'hooks/useRedux';

function TagsSection() {
  const { t } = useTranslation('translation', { keyPrefix: 'home' });
  const popularTags = useAppSelector((state) => state.tag.popularTags);

  return (
    <section className="mb-4">
      {popularTags && popularTags.length > 0 && (
        <>
          <h3>{t('popularTags')}</h3>
          <TagsContainer tags={popularTags} />
        </>
      )}
    </section>
  );
}

export default TagsSection;
