import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { closeModal } from 'redux/slices/modalAuthSlice';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import AuthForm from './AuthForm';

function ModalAuth() {
  const { id, isShown } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  return (
    <Modal show={isShown} onHide={() => dispatch(closeModal())} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#181a3f' }}>{t(`${id}`)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AuthForm />
      </Modal.Body>
    </Modal>
  );
}

export default ModalAuth;
