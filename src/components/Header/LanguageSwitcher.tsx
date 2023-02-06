import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import React from 'react';

function LanguageSwitcher() {
  return (
    <BootstrapSwitchButton
      checked
      onstyle="secondary"
      offstyle="light"
      onlabel="EN"
      offlabel="RU"
    />
  );
}

export default LanguageSwitcher;
