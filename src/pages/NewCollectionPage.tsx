import React, { memo, useState } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

import { setCollectionCreated } from 'redux/slices/successNotificationSlice';

import CollectionForm from 'components/CollectionForm/CollectionForm';
import CustomFieldsForm from 'components/CustomFieldsForm/CustomFieldsForm';
import Loader from 'components/Loader/Loader';
import Notification from 'components/Notification/Notification';

import useCreateCollection from 'hooks/useCreateCollection';
import { useAppSelector } from 'hooks/useRedux';

function NewCollectionPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const selectedUser = useAppSelector((state) => state.admin.selectedUser);
  const currentUser = selectedUser || user;
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const [isCreationErrorShown, setCreationErrorShown] = useState(false);

  const { customFields, setCustomFields, submitCreation, isLoadingCreation } =
    useCreateCollection(currentUser, setCreationErrorShown, setCollectionCreated);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      {isLoadingCreation && <Loader />}
      <NavLink
        to={selectedUser ? `/users/${selectedUser._id}` : '/profile'}
        className="link mb-2"
      >
        {t('return')}
      </NavLink>
      <h2>{t('create')}</h2>
      <div className="d-flex flex-wrap justify-content-between gap-2 flex-md-row flex-column">
        <CollectionForm ownerId={currentUser?._id} submitForm={submitCreation} />
        <CustomFieldsForm fields={customFields} setFields={setCustomFields} />
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
        <Button
          className="primary-button"
          type="submit"
          form="collectionForm"
          disabled={isLoadingCreation}
        >
          {t('confirmCreation')}
        </Button>
      </ButtonToolbar>
      <Notification
        message="collections.creationError"
        closeNotification={() => setCreationErrorShown(false)}
        isShown={isCreationErrorShown}
        variant="danger"
      />
    </div>
  );
}

export default memo(NewCollectionPage);
