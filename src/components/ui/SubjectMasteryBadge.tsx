import React from 'react';
import { CheckIcon } from './Icons';

/** 
 * Visual indicator for 100% subject mastery.
 */
export const SubjectMasteryBadge: React.FC = () => {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-md dark:border-slate-800">
      <CheckIcon className="h-4 w-4" />
    </div>
  );
};
