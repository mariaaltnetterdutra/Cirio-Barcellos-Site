import { LEADS_CONTENT } from "../content";
import type { LeadOrigin } from "../types";

export interface OriginDetail {
  label: string;
  value: string;
}

export interface OriginDescription {
  summary: string;
  details: OriginDetail[];
}

const LABELS = LEADS_CONTENT.originLabels;

function referrerHost(referrer: string): string {
  try {
    return new URL(referrer).host;
  } catch {
    return referrer;
  }
}

function summarize(origin: LeadOrigin): string {
  const { utmSource, utmMedium, utmCampaign, gclid, referrer } = origin;
  const source = utmSource ?? (gclid ? "google" : referrer ? referrerHost(referrer) : undefined);
  if (!source) return LEADS_CONTENT.item.directOrigin;

  return [[source, utmMedium].filter(Boolean).join(" / "), utmCampaign].filter(Boolean).join(" · ");
}

export function describeOrigin(origin: LeadOrigin): OriginDescription {
  const candidates: (OriginDetail | undefined)[] = [
    origin.utmSource ? { label: LABELS.utmSource, value: origin.utmSource } : undefined,
    origin.utmMedium ? { label: LABELS.utmMedium, value: origin.utmMedium } : undefined,
    origin.utmCampaign ? { label: LABELS.utmCampaign, value: origin.utmCampaign } : undefined,
    origin.utmTerm ? { label: LABELS.utmTerm, value: origin.utmTerm } : undefined,
    origin.utmContent ? { label: LABELS.utmContent, value: origin.utmContent } : undefined,
    origin.gclid ? { label: LABELS.gclid, value: LEADS_CONTENT.gclidFound } : undefined,
    origin.referrer ? { label: LABELS.referrer, value: origin.referrer } : undefined,
    origin.pagina ? { label: LABELS.pagina, value: origin.pagina } : undefined,
  ];

  return { summary: summarize(origin), details: candidates.filter((detail) => detail !== undefined) };
}
