import React from 'react';

interface Props {
  label: string;
  title: string;
  className?: string;
}

/** 
 * Standardizes the 'Label over Title' typographic pattern.
 */
export const HeaderGroup: React.FC<Props> = ({ label, title, className = "" }) => {
  return (
    <div className={className}>
      <h4 className="text-text-muted mb-1 hd-meta opacity-50">{label}</h4>
      <p className="text-text-main font-black uppercase tracking-tighter text-[14px]">{title}</p>
    </div>
  );
};
