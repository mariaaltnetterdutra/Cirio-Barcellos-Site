import { Injectable, Logger } from "@nestjs/common";
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

  constructor(private readonly leadsRepository: LeadsRepository) {}

  async create(dto: CreateLeadDto): Promise<CreateLeadResponseDto> {
    // Robô preencheu o campo invisível: responde como se fosse normal, mas não salva.
    if (dto.website) {
      this.logger.warn("Envio descartado pelo campo anti-robô.");
      return { protocolo: generateProtocol(), criadoEm: new Date().toISOString() };
    }

    const lead = await this.saveWithUniqueProtocol(dto);
    this.logger.log(`Novo pedido ${lead.protocolo}`);
    return { protocolo: lead.protocolo, criadoEm: lead.criadoEm.toISOString() };
  }

  // O protocolo é sorteado; no raro caso de repetir, tenta outro.
  private async saveWithUniqueProtocol(dto: CreateLeadDto): Promise<Lead> {
    for (let attempt = 1; ; attempt += 1) {
      try {
        return await this.leadsRepository.create({
          protocolo: generateProtocol(),
          nome: dto.nome,
          whatsapp: dto.whatsapp,
          objetivo: dto.objetivo,
          objetivoOutro: dto.objetivo === "outro" ? dto.objetivoOutro : undefined,
          valor: dto.valor,
          prazo: dto.prazo,
          origem: dto.origem ?? {},
          consentimentoEm: new Date(),
        });
      } catch (error) {
        if (!isDuplicateKeyError(error) || attempt >= MAX_PROTOCOL_ATTEMPTS) throw error;
      }
    }
  }
}
