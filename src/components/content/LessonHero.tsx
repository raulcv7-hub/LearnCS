import React from 'react';
import { Badge, type BadgeColor } from '../ui/Badge';
import { getDifficultyColorKey, getDurationColorKey } from '@core/styles/theme-utils';

interface Props {
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
}

/** Orchestrates the localized visual entry point of an AAU */
export const LessonHero: React.FC<Props> = ({ title, difficulty, duration }) => {
  return (
    <header className="animate-fade-in-up mb-10">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Badge color={getDifficultyColorKey(difficulty) as BadgeColor}>{difficulty}</Badge>
        <Badge color={getDurationColorKey(duration) as BadgeColor}>{duration}</Badge>
      </div>
      <h1 className="text-text-main mb-4 text-5xl font-black leading-[0.9] tracking-tighter md:text-8xl">
        {title}
      </h1>
    </header>
  );
};
