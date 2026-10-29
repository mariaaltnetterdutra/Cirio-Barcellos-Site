import { COMPANY } from "@/shared/constants/company";

const WHATSAPP_BASE_URL = "https://wa.me/";

/** Link do WhatsApp da empresa, com mensagem já escrita (opcional). */
export function buildWhatsAppUrl(message?: string): string {
  const url = `${WHATSAPP_BASE_URL}${COMPANY.whatsappNumber}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}
