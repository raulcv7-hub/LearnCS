import type { Locale } from '@core/domain/types';
import { resolvePath } from '@core/utils/path-utils';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  url: string;
}

interface Props {
  items: BreadcrumbItem[];
  lang: Locale;
}

/** 
 * Localized hierarchical navigation.
 * Uses the provided language context to resolve valid internal URLs.
 */
export const Breadcrumbs: React.FC<Props> = ({ items, lang }) => {
  return (
    <nav className="text-text-muted hidden items-center gap-2 md:flex">
      <a href={resolvePath('/', lang)} className="hd-meta hover:text-color-accent transition-colors">
        HOME
      </a>

      {items.map((item, index) => (
        <React.Fragment key={item.url}>
          <span className="opacity-60">/</span>
          {index === items.length - 1 ? (
            <span className="hd-meta text-color-accent border-color-accent/30 max-w-[200px] truncate border-b-2 pb-0.5">
              {item.label}
            </span>
          ) : (
            <a
              href={resolvePath(item.url, lang)}
              className="hd-meta hover:text-text-main whitespace-nowrap transition-colors"
            >
              {item.label}
            </a>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
