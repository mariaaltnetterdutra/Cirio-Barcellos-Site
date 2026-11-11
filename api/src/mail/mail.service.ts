import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport, type Transporter } from "nodemailer";
import type { EnvironmentVariables } from "../config/env.validation";
import type { Lead } from "../leads/schemas/lead.schema";
import { buildLeadEmail } from "./lead-email";

const SMTPS_PORT = 465;

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter?: Transporter;
  private readonly from?: string;
  private readonly to?: string;

  constructor(config: ConfigService<EnvironmentVariables, true>) {
    const host = config.get("SMTP_HOST", { infer: true });
    if (!host) return;

    const port = config.get("SMTP_PORT", { infer: true });
    this.from = config.get("MAIL_FROM", { infer: true });
    this.to = config.get("MAIL_TO", { infer: true });
    this.transporter = createTransport({
      host,
      port,
      secure: port === SMTPS_PORT,
      auth: { user: config.get("SMTP_USER", { infer: true }), pass: config.get("SMTP_PASS", { infer: true }) },
    });
  }

  /**
   * Avisa a equipe de um pedido novo. Devolve true se o email saiu.
   * Sem SMTP configurado (só em desenvolvimento) apenas mostra o texto no log.
   */
  async sendNewLead(lead: Lead): Promise<boolean> {
    const email = buildLeadEmail(lead);

    if (!this.transporter) {
      this.logger.log(`SMTP não configurado; email que seria enviado:\n${email.subject}\n${email.text}`);
      return false;
    }

    await this.transporter.sendMail({ from: this.from, to: this.to, subject: email.subject, text: email.text });
    return true;
  }
}
