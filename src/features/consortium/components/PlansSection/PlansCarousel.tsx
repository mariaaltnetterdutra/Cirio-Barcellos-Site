"use client";

import { Children, useRef, type ReactNode } from "react";
import { Icon } from "@/shared/components/ui/Icon/Icon";
import styles from "./PlansSection.module.css";

interface PlansCarouselProps {
  heading: ReactNode;
  previousLabel: string;
  nextLabel: string;
  children: ReactNode;
}

type Direction = -1 | 1;

export function PlansCarousel({ heading, previousLabel, nextLabel, children }: PlansCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);

  function move(direction: Direction) {
    const list = listRef.current;
    const firstItem = list?.firstElementChild;
    if (!list || !(firstItem instanceof HTMLElement)) return;
    const gap = Number.parseFloat(getComputedStyle(list).columnGap) || 0;
    list.scrollBy({ left: direction * (firstItem.offsetWidth + gap), behavior: "smooth" });
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
      <ul ref={listRef} className={styles.list}>
        {Children.map(children, (child) => (
          <li className={styles.item}>{child}</li>
        ))}
      </ul>
    </>
  );
}
