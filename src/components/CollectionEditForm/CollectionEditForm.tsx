import React, { memo, useState } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate } from 'react-router-dom';

import Loader from 'components/Loader/Loader';
import Notification from 'components/Notification/Notification';

import useCreateCollection from 'hooks/useCreateCollection';
import { useAppSelector } from 'hooks/useRedux';
import useUpdateCollection from 'hooks/useUpdateCollection';

import CollectionForm from './CollectionForm/CollectionForm';
import CustomFieldsForm from './CustomFieldsForm/CustomFieldsForm';

function CollectionEditForm() {
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const selectedUser = useAppSelector((state) => state.admin.selectedUser);
  const currentUser = selectedUser || user;
  const [isErrorShown, setErrorShown] = useState(false);
  const isCollectionCreated = useAppSelector(
    (state) => state.successNotification.isCollectionCreated
  );

  const {
    customFields,
    setCustomFields,
    submitUpdate,
    isLoadingUpdate,
    startFieldsIds,
    selectedCollection,
  } = useUpdateCollection(setErrorShown);

  const { submitCreation, isLoadingCreation } = useCreateCollection(
    currentUser,
    setErrorShown,
    customFields
  );

  const isLoading = isLoadingCreation || isLoadingUpdate || isCollectionCreated;

  const submitChanges = () => {
    if (selectedCollection) {
      return submitUpdate;
    }
    return submitCreation;
  };
  return (
    <>
      {isLoading && <Loader />}
      <NavLink to="" className="link mb-2" onClick={() => navigate(-1)}>
        {t('return')}
      </NavLink>
      <h2>{selectedCollection ? `${t('update')}` : `${t('create')}`}</h2>
      <div className="d-flex flex-wrap justify-content-between gap-2 flex-md-row flex-column">
        <CollectionForm ownerId={currentUser?._id} submitForm={submitChanges()} />
        <CustomFieldsForm
          fields={customFields}
          setFields={setCustomFields}
          selectedCollection={selectedCollection}
          startFieldsIds={startFieldsIds}
        />
      </div>
      <ButtonToolbar className="justify-content-center gap-5 mt-4 mb-3">
        <Button
          className="secondary-button"
          onClick={() => {
            navigate(-1);
          }}
        >
          {t('cancel')}
        </Button>
        <Button
          className="primary-button"
          type="submit"
          form="collectionForm"
          disabled={isLoading}
        >
          {t('confirm')}
        </Button>
      </ButtonToolbar>
      <Notification
        message="collections.error"
        closeNotification={() => setErrorShown(false)}
        isShown={isErrorShown}
        variant="danger"
      />
    </>
  );
}

export default memo(CollectionEditForm);
