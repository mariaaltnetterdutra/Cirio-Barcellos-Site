"use client";

import { trackEvent } from "@/core/analytics/track";
import { HoverCard } from "@/shared/components/ui/HoverCard/HoverCard";
import { GOALS_CONTENT as CONTENT } from "../../content";
import { useConsortiumIntent } from "../../state/ConsortiumIntentContext";
import styles from "./GoalsSection.module.css";

export function GoalCards() {
  const { chooseGoal } = useConsortiumIntent();

  return (
    <ul className={styles.list}>
      {CONTENT.items.map((item) => (
        <li key={item.value}>
          <HoverCard
            icon={item.icon}
            title={item.title}
            ctaLabel={CONTENT.cardLink}
            onClick={() => {
              trackEvent("clique_objetivo", { objetivo: item.value });
              chooseGoal(item.value);
            }}
          >
            {item.text}
          </HoverCard>
        </li>
      ))}
    </ul>
  );
}
