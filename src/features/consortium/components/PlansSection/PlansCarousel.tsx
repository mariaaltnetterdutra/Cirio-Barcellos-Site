"use client";

import { Children, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/shared/components/ui/Icon/Icon";
import { cn } from "@/shared/utils/cn";
import styles from "./PlansSection.module.css";

interface PlansCarouselProps {
  heading: ReactNode;
  previousLabel: string;
  nextLabel: string;
  ofLabel: string;
  children: ReactNode;
}

type Direction = -1 | 1;

function getStep(list: HTMLUListElement): number {
  const firstItem = list.firstElementChild;
  if (!(firstItem instanceof HTMLElement)) return 0;
  const gap = Number.parseFloat(getComputedStyle(list).columnGap) || 0;
  return firstItem.offsetWidth + gap;
}

export function PlansCarousel({ heading, previousLabel, nextLabel, ofLabel, children }: PlansCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  const count = Children.count(children);

  function move(direction: Direction) {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({ left: direction * getStep(list), behavior: "smooth" });
  }

  function handleScroll() {
    const list = listRef.current;
    const step = list ? getStep(list) : 0;
    if (!list || step === 0) return;
    setCurrent(Math.min(count - 1, Math.round(list.scrollLeft / step)));
  }

  return (
    <>
      <div className={styles.head}>
        {heading}
        <div className={styles.controls}>
          <button type="button" className={styles.arrow} aria-label={previousLabel} onClick={() => move(-1)}>
            <Icon name="arrow-right" className={styles.previousIcon} />
          </button>
          <button type="button" className={styles.arrow} aria-label={nextLabel} onClick={() => move(1)}>
            <Icon name="arrow-right" />
          </button>
        </div>
      </div>
      <ul ref={listRef} className={cn("scroll-row", styles.list)} onScroll={handleScroll}>
        {Children.map(children, (child) => (
          <li className={styles.item}>{child}</li>
        ))}
      </ul>
      <p className={styles.counter} aria-hidden="true">
        {current + 1} {ofLabel} {count}
      </p>
    </>
  );
}
