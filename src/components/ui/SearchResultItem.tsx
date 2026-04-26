import type { SearchEntry } from '@core/domain/types';
import React from 'react';
import { SearchTypeBadge } from './SearchTypeBadge';

interface Props {
  result: SearchEntry;
  onClick: () => void;
}

/** Pure presentation of a single search result node */
export const SearchResultItem: React.FC<Props> = ({ result, onClick }) => {
  return (
    <a
      href={result.url}
      onClick={onClick}
      className="hover:bg-blueprint-bg hover:border-border-color group flex items-center justify-between rounded-2xl border border-transparent p-4 transition-all"
    >
      <div className="min-w-0 flex-1 pr-4">
        <div className="mb-1 flex items-center gap-3">
          <span className="text-text-main group-hover:text-color-accent truncate text-lg font-black tracking-tight transition-colors">
            {result.title}
          </span>
        </div>
        {result.description && (
          <p className="text-text-muted truncate text-[14px] font-medium opacity-70">
            {result.description}
          </p>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end">
        <SearchTypeBadge type={result.type} />
      </div>
    </a>
  );
};
