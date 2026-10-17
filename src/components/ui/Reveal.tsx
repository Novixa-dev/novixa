'use client';

import React from 'react';
import { motion, type Variants } from 'motion/react';

/**
 * Scroll-reveal for a block of content.
 *
 * Sections across the site each hand-rolled their own `motion.div` with
 * slightly different distances, durations and easings, so content arrived at
 * visibly inconsistent speeds as you scrolled. This is the one definition.
 *
 * Reduced motion is handled by `MotionConfig reducedMotion="user"` in the root
 * layout: the opacity fade still runs, the translation does not. That is the
 * right split — the preference is about movement, not about content appearing.
 *
 * `once: true` means a section animates the first time it enters the viewport
 * and then stays put; replaying on every scroll-past is a well-known way to
 * make a page feel restless.
 */

type Direction = 'up' | 'down' | 'start' | 'end' | 'scale' | 'none';

const OFFSET = 20;

function offsetFor(direction: Direction): { x?: number; y?: number; scale?: number } {
  switch (direction) {
    case 'up':
      return { y: OFFSET };
    case 'down':
      return { y: -OFFSET };
    case 'start':
      return { x: OFFSET };
    case 'end':
      return { x: -OFFSET };
    case 'scale':
      return { scale: 0.95 };
    default:
      return {};
  }
}

export interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Which way the content travels in from. Defaults to rising. */
  direction?: Direction;
  /** Seconds to wait before starting — for staggering siblings. */
  delay?: number;
  duration?: number;
  as?: 'div' | 'section' | 'li' | 'article';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.45,
  as = 'div',
}) => {
  const offset = offsetFor(direction);

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
};

/**
 * Staggers direct children of a list or grid.
 */
export const RevealGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child. Keep small — 0.08 reads as a fluid cascade. */
  stagger?: number;
  delay?: number;
}> = ({ children, className, stagger = 0.08, delay = 0 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
    }}
  >
    {children}
  </motion.div>
);

/** A child of `RevealGroup`. Inherits the parent's stagger timing. */
export const RevealItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  hoverLift?: boolean;
}> = ({ children, className, hoverLift = false }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: OFFSET },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      },
    }}
    {...(hoverLift
      ? {
          whileHover: { y: -4, transition: { duration: 0.2, ease: 'easeOut' } },
          whileTap: { scale: 0.99 },
        }
      : {})}
  >
    {children}
  </motion.div>
);

/** A card wrapper that combines in-view entry and subtle hover response. */
export const RevealCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.08, margin: '0px 0px -40px 0px' }}
    variants={{
      hidden: { opacity: 0, y: OFFSET },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] },
      },
    }}
    whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
    whileTap={{ scale: 0.99 }}
  >
    {children}
  </motion.div>
);

/** Smooth micro-interaction for buttons and interactive items. */
export const HoverLift: React.FC<{
  children: React.ReactNode;
  className?: string;
  lift?: number;
  scale?: number;
}> = ({ children, className, lift = -3, scale = 1 }) => (
  <motion.div
    className={className}
    whileHover={{ y: lift, scale, transition: { duration: 0.18, ease: 'easeOut' } }}
    whileTap={{ scale: 0.985 }}
  >
    {children}
  </motion.div>
);
