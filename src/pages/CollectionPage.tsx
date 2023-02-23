import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import CollectionInfo from 'components/CollectionInfo/CollectionInfo';

import useGetCollectionFromLocation from 'hooks/useGetCollectionFromLocation';

function CollectionPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'collectionPage' });
  const navigate = useNavigate();
  useGetCollectionFromLocation();

  return (
    <div className="content">
      <NavLink className="link mb-2" to="" onClick={() => navigate(-1)}>
        {t('return')}
      </NavLink>
      <CollectionInfo />
    </div>
  );
}

export default CollectionPage;
