import React from 'react';
import { Badge, type BadgeColor } from './Badge';
import { getCategoryColorKey } from '@core/styles/theme-utils';
import { FadeIn } from './FadeIn';

interface Props {
  title: string;
  type: string;
  description: string;
}

/** 
 * Restored Font Sizes for the Subject Hero.
 */
export const SubjectHero: React.FC<Props> = ({ title, type, description }) => {
  const colorKey = getCategoryColorKey(type) as BadgeColor;

  return (
    <FadeIn>
      <header className="mb-24 text-left">
        <div className="mb-6">
          <Badge color={colorKey}>{type}</Badge>
        </div>
        <h1 className="text-text-main mb-6 text-6xl font-black tracking-tighter md:text-8xl">
          {title}
        </h1>
        <p className="text-text-muted max-w-2xl text-2xl font-medium leading-relaxed opacity-90">
          {description}
        </p>
      </header>
    </FadeIn>
  );
};
