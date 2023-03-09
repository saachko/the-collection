import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';

type NotificationVariant = 'danger' | 'primary';

interface NotificationProps {
  message: string;
  closeNotification: () => void;
  isShown: boolean;
  variant: NotificationVariant;
}

function Notification({
  message,
  closeNotification,
  isShown,
  variant,
}: NotificationProps) {
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
      setTimeout(() => closeNotification(), 200);
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
            variant={variant}
            onClose={() => setMountNotification(false)}
            dismissible
          >
            {variant === 'danger' && (
              <Alert.Heading style={{ fontSize: '20px' }}>
                {t('auth.error')}
              </Alert.Heading>
            )}
            <p>{t(message)}</p>
          </Alert>
        )}
      </div>
    </CSSTransition>
  );
}

export default Notification;
