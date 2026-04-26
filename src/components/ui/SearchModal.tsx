import React, { useEffect, useRef, useState } from 'react';
import type { SearchEntry } from '@core/domain/types';
import Fuse from 'fuse.js';
import { Surface } from './Surface';
import { HeaderGroup } from './HeaderGroup';
import { SearchResultItem } from './SearchResultItem';

/** Command-palette search engine for localized knowledge traversal */
export const SearchModal: React.FC<{ data: SearchEntry[] }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setIsOpen(p => !p); }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => { if (isOpen) inputRef.current?.focus(); else { setQuery(''); setResults([]); } }, [isOpen]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; setQuery(val);
    if (val.length < 2) return setResults([]);
    const fuse = new Fuse(data, { keys: ['title', 'description', 'category'], threshold: 0.3 });
    const res = fuse.search(val).map(r => r.item).sort((a, b) => ({ subject: 0, lesson: 1, fragment: 2 }[a.type] - { subject: 0, lesson: 1, fragment: 2 }[b.type]));
    setResults(res.slice(0, 8));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/60 pt-[10vh] backdrop-blur-md px-4" onClick={() => setIsOpen(false)}>
      <Surface 
        className="w-full max-w-2xl overflow-hidden" 
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="border-b border-border-color p-6 flex flex-col gap-4">
          <HeaderGroup label="Command" title="Knowledge Discovery" />
          <input ref={inputRef} value={query} onChange={handleSearch} placeholder="Search knowledge..." className="text-text-main w-full bg-transparent text-2xl font-black outline-none" />
        </div>
        <div className="custom-scrollbar max-h-[50vh] overflow-y-auto p-4">
          {results.length ? results.map(r => <SearchResultItem key={`${r.type}-${r.id}`} result={r} onClick={() => setIsOpen(false)} />) : (
            <p className="text-text-muted py-20 text-center hd-meta opacity-40">Zero nodes matched</p>
          )}
        </div>
      </Surface>
    </div>
  );
};
