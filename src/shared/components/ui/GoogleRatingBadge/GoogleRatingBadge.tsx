import { COMPANY } from "@/shared/constants/company";
import { cn } from "@/shared/utils/cn";
import { formatRating } from "@/shared/utils/format";
import { Icon } from "../Icon/Icon";
import styles from "./GoogleRatingBadge.module.css";

const MAX_STARS = 5;

interface GoogleRatingBadgeProps {
  label: string;
  linkLabel: string;
  className?: string;
}

export function GoogleRatingBadge({ label, linkLabel, className }: GoogleRatingBadgeProps) {
  const { rating, url } = COMPANY.googleReviews;
  const ratingText = formatRating(rating);
  const filledStars = Math.round(rating);

  return (
    <div className={cn(styles.badge, className)}>
      <span className={styles.stars} role="img" aria-label={`Nota ${ratingText} de ${MAX_STARS}`}>
        {Array.from({ length: MAX_STARS }, (_, index) => (
          <Icon
            key={index}
            name="star"
            size="sm"
            className={cn(styles.star, index < filledStars && styles.filled)}
          />
        ))}
      </span>
      <span className={styles.rating}>
        <b className={styles.value}>{ratingText}</b> {label}
      </span>
      <a className={styles.link} href={url} target="_blank" rel="noopener noreferrer">
        {linkLabel}
      </a>
    </div>
  );
}
