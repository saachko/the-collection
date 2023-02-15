import clsx from 'clsx';
import React, { memo, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { closeModal } from 'redux/slices/modalAuthSlice';

import ErrorNotification from 'components/ErrorNotification/ErrorNotification';

import useAuth from 'hooks/useAuth';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import AuthForm from './AuthForm';
import styles from './ModalAuth.module.scss';

function ModalAuth() {
  const { id, isShown } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const [isSignUpErrorShown, setSignUpErrorShown] = useState(false);
  const [isSignInErrorShown, setSignInErrorShown] = useState(false);
  const { submitForm, isLoadingAuth, signUpErrorMessage, signInErrorMessage } =
    useAuth(id);

  const isButtonDisabled = isSignUpErrorShown || isSignInErrorShown || isLoadingAuth;

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
        <Modal.Header
          closeButton
          className={clsx(styles.modalBackground, styles.modalHeader)}
        >
          <Modal.Title>{t(`${id}`)}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={clsx(styles.modalBackground, styles.modalBody)}>
          <AuthForm
            submitForm={submitForm}
            isInputDisabled={isLoadingAuth}
            isButtonDisabled={isButtonDisabled}
          />
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
