import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function ButtonControls() {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });

  return (
    <div>
      <Button className="secondary-button me-2">{t('signin')}</Button>
      <Button className="primary-button">{t('signup')}</Button>
    </div>
  );
}

export default memo(ButtonControls);
