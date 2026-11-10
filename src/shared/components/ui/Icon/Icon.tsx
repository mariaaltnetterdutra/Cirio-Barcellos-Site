import { cn } from "@/shared/utils/cn";
import { ICONS, type IconName, type IconShape } from "./icons";
import styles from "./Icon.module.css";

export type { IconName };
export type IconSize = "sm" | "md" | "lg";

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

function renderShape(shape: IconShape, index: number) {
  switch (shape.kind) {
    case "path":
      return <path key={index} d={shape.d} />;
    case "circle":
      return <circle key={index} cx={shape.cx} cy={shape.cy} r={shape.r} />;
    case "rect":
      return (
        <rect
          key={index}
          x={shape.x}
          y={shape.y}
          width={shape.width}
          height={shape.height}
          rx={shape.rx}
        />
      );
  }
}

export function Icon({ name, size = "md", className }: IconProps) {
  return (
    <svg
      className={cn(styles.icon, styles[size], className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name].map(renderShape)}
    </svg>
  );
}
