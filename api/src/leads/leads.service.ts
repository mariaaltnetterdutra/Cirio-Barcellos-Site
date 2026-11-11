import { Injectable, Logger } from "@nestjs/common";
import { MailService } from "../mail/mail.service";
import type { CreateLeadResponseDto } from "./dto/create-lead-response.dto";
import type { CreateLeadDto } from "./dto/create-lead.dto";
import { LeadsRepository } from "./leads.repository";
import { generateProtocol } from "./protocol";
import type { Lead } from "./schemas/lead.schema";

const MAX_PROTOCOL_ATTEMPTS = 5;
const MONGO_DUPLICATE_KEY = 11000;

function isDuplicateKeyError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === MONGO_DUPLICATE_KEY;
}

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    private readonly leadsRepository: LeadsRepository,
    private readonly mailService: MailService,
  ) {}

  async create(dto: CreateLeadDto): Promise<CreateLeadResponseDto> {
    if (dto.website) {
      this.logger.warn("Envio descartado pelo campo anti-robô.");
      return { protocolo: generateProtocol(), criadoEm: new Date().toISOString() };
    }

    const lead = await this.saveWithUniqueProtocol(dto);
    this.logger.log(`Novo pedido ${lead.protocolo}`);
    // Sem await: o cliente recebe o protocolo sem esperar o email, e uma falha no email não perde o pedido.
    void this.notifyTeam(lead);
    return { protocolo: lead.protocolo, criadoEm: lead.criadoEm.toISOString() };
  }

  private async notifyTeam(lead: Lead): Promise<void> {
    try {
      const sent = await this.mailService.sendNewLead(lead);
      if (sent) await this.leadsRepository.markEmailSent(lead.protocolo);
    } catch (error) {
      // Só o protocolo vai para o log: nome e telefone do cliente ficam fora.
      this.logger.error(`Falha ao avisar a equipe do pedido ${lead.protocolo}`, error instanceof Error ? error.stack : undefined);
    }
  }

  private async saveWithUniqueProtocol(dto: CreateLeadDto): Promise<Lead> {
    for (let attempt = 1; ; attempt += 1) {
      try {
        return await this.leadsRepository.create({
          protocolo: generateProtocol(),
          nome: dto.nome,
          whatsapp: dto.whatsapp,
          objetivo: dto.objetivo,
          valorCredito: dto.valorCredito,
          prazoMeses: dto.prazoMeses,
          origem: dto.origem ?? {},
          consentimentoEm: new Date(),
        });
      } catch (error) {
        if (!isDuplicateKeyError(error) || attempt >= MAX_PROTOCOL_ATTEMPTS) throw error;
      }
    }
  }
}
