"use client";

import type { ComponentProps } from "react";
import { sectionHref, type SectionId } from "@/shared/constants/routes";
import { handleSectionLinkClick } from "@/shared/utils/scroll";
import { ButtonLink } from "../Button/Button";

type SectionButtonLinkProps = Omit<ComponentProps<typeof ButtonLink>, "href" | "onClick"> & {
  sectionId: SectionId;
};

export function SectionButtonLink({ sectionId, ...props }: SectionButtonLinkProps) {
  return (
    <ButtonLink
      href={sectionHref(sectionId)}
      onClick={(event) => handleSectionLinkClick(event, sectionId)}
      {...props}
    />
  );
}
