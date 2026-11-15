import { Injectable, NotFoundException } from "@nestjs/common";
import { buildLeadFilter, buildSearchFilter } from "../leads/leads-filter";
import type { LeadStatus } from "../leads/leads.constants";
import { LeadsRepository } from "../leads/leads.repository";
import { PROTOCOL_PATTERN } from "../leads/protocol";
import { type AdminLeadDto, type AdminLeadsPageDto, toAdminLeadDto } from "./dto/admin-lead.dto";
import type { ListLeadsQueryDto } from "./dto/list-leads-query.dto";

@Injectable()
export class AdminLeadsService {
  constructor(private readonly leadsRepository: LeadsRepository) {}

  async list(query: ListLeadsQueryDto): Promise<AdminLeadsPageDto> {
    const { busca, objetivo, status, pagina, limite } = query;
    const filter = buildLeadFilter({ busca, objetivo, status });

    const [leads, total, resumo] = await Promise.all([
      this.leadsRepository.findPage(filter, (pagina - 1) * limite, limite),
      this.leadsRepository.count(filter),
      // Os contadores ignoram o filtro de status para o painel mostrar quantos há em cada um.
      this.leadsRepository.countByStatus(buildSearchFilter({ busca, objetivo })),
    ]);

    return {
      itens: leads.map(toAdminLeadDto),
      total,
      pagina,
      limite,
      totalPaginas: Math.max(1, Math.ceil(total / limite)),
      resumo,
    };
  }

  async updateStatus(protocolo: string, status: LeadStatus): Promise<AdminLeadDto> {
    const lead = PROTOCOL_PATTERN.test(protocolo)
      ? await this.leadsRepository.updateStatus(protocolo, status)
      : null;
    if (!lead) throw new NotFoundException("Pedido não encontrado.");
    return toAdminLeadDto(lead);
  }
}
