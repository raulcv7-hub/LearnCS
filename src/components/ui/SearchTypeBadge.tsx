import React from 'react';
import { Badge, type BadgeColor } from './Badge';

/** Isolated atom for categorized search results */
export const SearchTypeBadge: React.FC<{ type: 'subject' | 'lesson' | 'fragment' }> = ({ type }) => {
  const colors: Record<string, BadgeColor> = { subject: 'blue', lesson: 'emerald', fragment: 'purple' };
  return <Badge color={colors[type] as BadgeColor}>{type}</Badge>;
};
