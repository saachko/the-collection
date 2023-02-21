import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Navigate } from 'react-router-dom';

import CollectionForm from 'components/CollectionForm/CollectionForm';
import CustomFieldsForm from 'components/CustomFieldsForm/CustomFieldsForm';

import { useAppSelector } from 'hooks/useRedux';

function NewCollectionPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });
  const user = useAppSelector((state) => state.user.user);
  const selectedUser = useAppSelector((state) => state.admin.selectedUser);
  const currentUser = selectedUser || user;
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      <NavLink to="/profile" className="link mb-2">
        {t('return')}
      </NavLink>
      <h2>{t('create')}</h2>
      <div className="d-flex flex-wrap justify-content-between gap-2">
        <CollectionForm />
        <CustomFieldsForm />
      </div>
    </div>
  );
}

export default memo(NewCollectionPage);
