import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

function NotFoundPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'notFound' });

  return (
    <div className="content text-center mt-10">
      <h3>{t('title')}</h3>
      <p>{t('text')}</p>
      <NavLink to="/">
        <Button className="secondary-button">{t('buttonText')}</Button>
      </NavLink>
    </div>
  );
}

export default memo(NotFoundPage);
