import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Logo from 'components/Logo/Logo';

import { authorsContacts } from 'utils/constants';

import styles from './Footer.module.scss';

function Footer() {
  const { t } = useTranslation('translation', { keyPrefix: 'footer' });

  return (
    <footer>
      <div className={styles.footerContent}>
        <Logo />
        <div className="d-flex flex-column align-items-center gap-1">
          <div className="d-flex gap-2">
            {authorsContacts.map((contact) => (
              <a
                key={contact.id}
                href={contact.link}
                target="_blank"
                title={contact.title}
                rel="noreferrer"
              >
                {contact.icon}
              </a>
            ))}
          </div>
          <p className={styles.copyright}>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
