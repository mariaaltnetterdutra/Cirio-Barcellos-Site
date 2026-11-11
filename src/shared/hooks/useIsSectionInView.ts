import { useEffect, useState } from "react";

export function useIsSectionInView(sectionId: string): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry?.isIntersecting ?? false);
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionId]);

  return isInView;
}
