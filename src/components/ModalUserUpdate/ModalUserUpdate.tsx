import clsx from 'clsx';
import React, { memo } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { User } from 'ts/interfaces';
import { SetState } from 'ts/types';

import styles from './ModalUserUpdate.module.scss';
import UpdateUserForm from './UpdateUserForm';

interface ModalUserUpdateProps {
  isShown: boolean;
  setShown: SetState<boolean>;
  setUpdateErrorShown: SetState<boolean>;
  user: User | null;
}

function ModalUserUpdate({
  isShown,
  setShown,
  setUpdateErrorShown,
  user,
}: ModalUserUpdateProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'profilePage' });

  return (
    <Modal show={isShown} onHide={() => setShown(false)} centered>
      <Modal.Header
        closeButton
        className={clsx(styles.modalBackground, styles.modalHeader)}
      >
        <Modal.Title>{t('userUpdateTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={clsx(styles.modalBackground, styles.modalBody)}>
        <UpdateUserForm
          setModalShown={setShown}
          setUpdateErrorShown={setUpdateErrorShown}
          user={user}
        />
      </Modal.Body>
    </Modal>
  );
}

export default memo(ModalUserUpdate);
