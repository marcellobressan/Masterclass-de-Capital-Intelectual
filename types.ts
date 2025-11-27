import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface SectionData {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode; // Can be text or custom component structure
  icon: LucideIcon;
}

export enum SectionId {
  INTRO = 'intro',
  COMPONENTS = 'components',
  PROCESSES = 'processes',
  SECI_WORKSHOP = 'seci_workshop',
  MEASUREMENT = 'measurement',
  DISCLOSURE = 'disclosure',
  CONCLUSION = 'conclusion',
}