import React, { memo, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { closeModal } from 'redux/slices/modalAuthSlice';

import ErrorNotification from 'components/ErrorNotification/ErrorNotification';

import useAuth from 'hooks/useAuth';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import AuthForm from './AuthForm';

function ModalAuth() {
  const { id, isShown } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const [isSignUpErrorShown, setSignUpErrorShown] = useState(false);
  const [isSignInErrorShown, setSignInErrorShown] = useState(false);
  const { submitForm, isLoadingAuth, signUpErrorMessage, signInErrorMessage } =
    useAuth(id);

  const closeSignUpErrorNotification = () => {
    setSignUpErrorShown(false);
  };

  const closeSignInErrorNotification = () => {
    setSignInErrorShown(false);
  };

  useEffect(() => {
    if (signUpErrorMessage) {
      setSignUpErrorShown(true);
    }
  }, [signUpErrorMessage]);

  useEffect(() => {
    if (signInErrorMessage) {
      setSignInErrorShown(true);
    }
  }, [signInErrorMessage]);

  return (
    <>
      <Modal show={isShown} onHide={() => dispatch(closeModal())} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#181a3f' }}>{t(`${id}`)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AuthForm submitForm={submitForm} isLoadingAuth={isLoadingAuth} />
        </Modal.Body>
      </Modal>
      <ErrorNotification
        errorMessage={`${signUpErrorMessage}`}
        closeErrorNotification={closeSignUpErrorNotification}
        isShown={isSignUpErrorShown}
      />
      <ErrorNotification
        errorMessage={`${signInErrorMessage}`}
        closeErrorNotification={closeSignInErrorNotification}
        isShown={isSignInErrorShown}
      />
    </>
  );
}

export default memo(ModalAuth);
