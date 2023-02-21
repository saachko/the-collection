import React, { memo, useEffect, useState } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

import { useCreateCollectionMutation } from 'redux/api/collectionApiSlice';
import { useCreateCustomFieldMutation } from 'redux/api/customFieldApiSlice';

import CollectionForm from 'components/CollectionForm/CollectionForm';
import CustomFieldsForm from 'components/CustomFieldsForm/CustomFieldsForm';
import Loader from 'components/Loader/Loader';

import { createCollectionImage } from 'utils/functions';

import { useAppSelector } from 'hooks/useRedux';

import {
  CollectionFormValues,
  CollectionRequestBody,
  CustomFieldFormValuesWithId,
  CustomFieldRequestBody,
} from 'ts/interfaces';

function NewCollectionPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'collections' });
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const selectedUser = useAppSelector((state) => state.admin.selectedUser);
  const currentUser = selectedUser || user;
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const [customFields, setCustomFields] = useState<CustomFieldFormValuesWithId[]>([]);

  const [
    createCollection,
    {
      data: newCollection,
      isLoading: isLoadingCollectionCreation,
      isSuccess: isSuccessCollectionCreation,
    },
  ] = useCreateCollectionMutation();

  const [
    createCustomField,
    { isLoading: isLoadingFieldCreation, isSuccess: isSuccessFieldCreation },
  ] = useCreateCustomFieldMutation();

  const isLoadingCreation = isLoadingCollectionCreation || isLoadingFieldCreation;

  const validateCustomFields = () =>
    customFields.filter((field) => field.label && field.type);

  const submitCreation: SubmitHandler<CollectionFormValues> = async ({
    ...formValues
  }) => {
    const newCollectionParams: CollectionRequestBody = {
      title: formValues.title,
      description: formValues.description || '**No description provided**',
      theme: formValues.theme || 'other',
      image:
        formValues.image || createCollectionImage(formValues.title, currentUser?._id),
      ownerId: currentUser?._id,
      ownerName: currentUser?.username,
    };
    await createCollection(newCollectionParams);
  };

  useEffect(() => {
    if (newCollection && isSuccessCollectionCreation) {
      const validatedCustomFields = validateCustomFields();
      const newFields: CustomFieldRequestBody[] = validatedCustomFields.map(
        (newField) => ({
          type: newField.type,
          label: newField.label,
          collectionId: newCollection._id,
        })
      );
      newFields.map(async (newField) => {
        await createCustomField(newField);
      });
    }
  }, [isSuccessCollectionCreation]);

  useEffect(() => {
    if (isSuccessFieldCreation) navigate(-1);
  }, [isSuccessFieldCreation]);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="content">
      {/* CHANGE PATH FOR USER'S PAGE (NOT TO PROFILE PAGE) */}
      {isLoadingCreation && <Loader />}
      <NavLink to="/profile" className="link mb-2">
        {t('return')}
      </NavLink>
      <h2>{t('create')}</h2>
      <div className="d-flex flex-wrap justify-content-between gap-2">
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
    </div>
  );
}

export default memo(NewCollectionPage);
