import type { Locale } from '@core/domain/types';
import React from 'react';
import { ActionControl } from './ActionControl';

/** Header control for linguistic context transformation */
export const LanguageSwitcher: React.FC<{ currentLang: Locale }> = ({ currentLang }) => {
  const toggle = () => {
    const newLang = currentLang === 'en' ? 'es' : 'en';
    const path = window.location.pathname;
    window.location.href = path.replace(/\/(en|es)\//, `/${newLang}/`).replace(/\/(en|es)$/, `/${newLang}`);
  };

  return (
    <ActionControl onClick={toggle} ariaLabel="Switch Language">
      <span className="text-text-muted group-hover:text-color-accent hd-meta text-[14px]">
        {currentLang === 'en' ? 'EN' : 'ES'}
      </span>
    </ActionControl>
  );
};
