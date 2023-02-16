import React, { memo, useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';

interface ErrorNotificationProps {
  errorMessage: string;
  closeErrorNotification: () => void;
  isShown: boolean;
}

function ErrorNotification({
  errorMessage,
  closeErrorNotification,
  isShown,
}: ErrorNotificationProps) {
  const { t } = useTranslation('translation');
  const [mountNotification, setMountNotification] = useState(false);
  const alertRef = useRef(null);
  useEffect(() => {
    if (isShown) {
      setMountNotification(true);
      setTimeout(() => setMountNotification(false), 2200);
    }
  }, [isShown]);

  useEffect(() => {
    if (!mountNotification) {
      setTimeout(() => closeErrorNotification(), 200);
    }
  }, [mountNotification]);

  return (
    <CSSTransition
      nodeRef={alertRef}
      in={mountNotification}
      timeout={200}
      classNames="alert"
    >
      <div>
        {isShown && (
          <Alert
            ref={alertRef}
            variant="danger"
            onClose={() => setMountNotification(false)}
            dismissible
          >
            <Alert.Heading style={{ fontSize: '20px' }}>{t('auth.error')}</Alert.Heading>
            <p>{t(errorMessage)}</p>
          </Alert>
        )}
      </div>
    </CSSTransition>
  );
}

export default memo(ErrorNotification);
