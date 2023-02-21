import React, { memo } from 'react';
import { Button, ButtonToolbar, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

import CollectionForm from 'components/CollectionForm/CollectionForm';
import CustomFieldsForm from 'components/CustomFieldsForm/CustomFieldsForm';

import { useAppSelector } from 'hooks/useRedux';

function NewCollectionPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const selectedUser = useAppSelector((state) => state.admin.selectedUser);
  const currentUser = selectedUser || user;
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      {/* CHANGE PATH FOR USER'S PAGE (NOT TO PROFILE PAGE) */}
      <NavLink to="/profile" className="link mb-2">
        {t('return')}
      </NavLink>
      <h2>{t('create')}</h2>
      <Form aria-label="form" noValidate autoComplete="off">
        <div className="d-flex flex-wrap justify-content-between gap-2">
          <CollectionForm />
          <CustomFieldsForm />
        </div>
        <ButtonToolbar className="justify-content-center gap-5 mt-4 mb-3">
          <Button
            className="secondary-button"
            onClick={() => {
              navigate(-1);
            }}
          >
            {t('cancelCreation')}
          </Button>
          <Button className="primary-button" onClick={() => console.log('created')}>
            {t('confirmCreation')}
          </Button>
        </ButtonToolbar>
      </Form>
    </div>
  );
}

export default memo(NewCollectionPage);
