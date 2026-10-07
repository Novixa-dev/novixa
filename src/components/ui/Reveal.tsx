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

type Direction = 'up' | 'down' | 'start' | 'end' | 'none';

const OFFSET = 16;

function offsetFor(direction: Direction): { x?: number; y?: number } {
  switch (direction) {
    case 'up':
      return { y: OFFSET };
    case 'down':
      return { y: -OFFSET };
    // `start`/`end` are logical: the caller does not need to know the
    // document direction, matching the RTL-safe conventions used elsewhere.
    case 'start':
      return { x: OFFSET };
    case 'end':
      return { x: -OFFSET };
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
  as?: 'div' | 'section' | 'li' | 'article';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  direction = 'up',
  delay = 0,
  as = 'div',
}) => {
  const offset = offsetFor(direction);

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.4,
        delay,
        // Decelerating curve: quick to start, settles softly. Matches the
        // 150–200ms interaction transitions used on buttons and cards.
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
      // `margin` starts the animation slightly before the element scrolls in,
      // so it has finished by the time it is properly in view.
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -80px 0px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
};

/**
 * Staggers direct children of a list or grid.
 *
 * Kept separate from `Reveal` because staggering needs the parent to own the
 * timing; nesting `Reveal` per item with hand-computed delays is what produced
 * the inconsistent cascades this replaces.
 */
export const RevealGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
  /** Seconds between each child. Keep small — 0.06 reads as one motion. */
  stagger?: number;
}> = ({ children, className, stagger = 0.06 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1, margin: '0px 0px -80px 0px' }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: stagger } },
    }}
  >
    {children}
  </motion.div>
);

/** A child of `RevealGroup`. Inherits the parent's stagger timing. */
export const RevealItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: OFFSET },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    }}
  >
    {children}
  </motion.div>
);
