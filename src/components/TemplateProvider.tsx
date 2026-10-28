'use client';

import { createContext, useContext } from 'react';
import { MotionConfig } from 'framer-motion';

import { templateStyle } from '@/templates/style';
import type { TemplateDef } from '@/templates/types';

const TemplateContext = createContext<TemplateDef | null>(null);

/**
 * Holds the template the invitation is drawn with, and sets its palette and
 * faces as CSS variables on one wrapper — so everything inside, including the
 * fixed opening and controls, is drawn from the same template.
 */
export function TemplateProvider({
  template,
  className = '',
  style,
  children,
}: {
  template: TemplateDef;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <TemplateContext.Provider value={template}>
      {/*
        One render path for everyone: with "user", Framer drops transforms
        for a guest who prefers less motion and keeps only fades. Branching
        the markup on that preference instead would differ from the server
        render, and React does not patch attributes on hydration — content
        would be left invisible.
      */}
      <MotionConfig reducedMotion="user">
        <div
          data-template={template.id}
          data-heading={template.headingStyle}
          className={`font-body text-t-ink ${className}`}
          style={{ ...templateStyle(template), ...style }}
        >
          {children}
        </div>
      </MotionConfig>
    </TemplateContext.Provider>
  );
}

export function useTemplate(): TemplateDef {
  const value = useContext(TemplateContext);
  if (!value) throw new Error('useTemplate must be used inside a TemplateProvider');
  return value;
}
