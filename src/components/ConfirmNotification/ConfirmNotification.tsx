import clsx from 'clsx';
import React, { memo } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { SetState } from 'ts/types';

import styles from './ConfirmNotification.module.scss';

interface ConfirmNotificationProps {
  isShown: boolean;
  setShown: SetState<boolean>;
  onConfirm: () => void;
  text: string;
}

function ConfirmNotification({
  isShown,
  setShown,
  text,
  onConfirm,
}: ConfirmNotificationProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'confirmNotification' });

  const handleConfirm = () => {
    onConfirm();
    setShown(false);
  };

  return (
    <Modal
      show={isShown}
      onHide={() => {
        setShown(false);
      }}
    >
      <Modal.Body className={clsx(styles.modalBackground, styles.modalBody)}>
        {text}
      </Modal.Body>
      <Modal.Footer className={styles.modalBackground}>
        <Button
          className="secondary-button"
          onClick={() => {
            setShown(false);
          }}
        >
          {t('cancel')}
        </Button>
        <Button className="primary-button" onClick={handleConfirm}>
          {t('confirm')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default memo(ConfirmNotification);
