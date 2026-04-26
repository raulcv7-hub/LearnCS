import React from 'react';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { ThemeToggle } from '../ui/ThemeToggle';
import { HeaderLogo } from './HeaderLogo';
import { HeaderSearchTrigger } from './HeaderSearchTrigger';
import { HeaderProgressBar } from './HeaderProgressBar';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import type { Locale } from '@core/domain/types';

interface Props {
  breadcrumbItems?: { label: string; url: string }[];
  lang: Locale;
}

/** 
 * Global Header with integrated Context Controls.
 * Orchestrates language propagation to all navigational atoms.
 */
export const Header: React.FC<Props> = ({ breadcrumbItems = [], lang }) => {
  return (
    <header className="border-border-color bg-blueprint-surface fixed left-0 top-0 z-50 w-full border-b">
      <div className="mx-auto flex max-w-[1700px] items-center justify-between px-8 py-4">
        <HeaderLogo />

        <div className="flex flex-1 justify-center">
          {/** Fixed: Passing lang prop to preserve routing context */}
          <Breadcrumbs items={breadcrumbItems} lang={lang} />
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <HeaderSearchTrigger />
          <div className="bg-border-color h-6 w-px mx-2"></div>
          <LanguageSwitcher currentLang={lang} />
          <ThemeToggle />
        </div>
      </div>

      <HeaderProgressBar />
    </header>
  );
};
