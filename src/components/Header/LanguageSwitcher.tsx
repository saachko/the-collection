import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import i18next from 'i18next';
import React, { useCallback } from 'react';

import i18n from '../../languages/i18n';

function LanguageSwitcher() {
  const changeLanguage = useCallback((language: string) => {
    i18n.changeLanguage(language);
  }, []);

  return (
    <BootstrapSwitchButton
      onstyle="secondary"
      offstyle="light"
      onlabel="EN"
      offlabel="RU"
      onChange={() => changeLanguage(i18next.language === 'en' ? 'ru' : 'en')}
      checked={i18next.language === 'en'}
    />
  );
}

export default LanguageSwitcher;
