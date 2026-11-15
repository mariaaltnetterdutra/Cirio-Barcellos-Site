import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { FilterQuery, Model } from "mongoose";
import type { LeadStatus } from "./leads.constants";
import { Lead } from "./schemas/lead.schema";

export type NewLead = Pick<
  Lead,
  "protocolo" | "nome" | "whatsapp" | "objetivo" | "origem" | "consentimentoEm"
> &
  Partial<Pick<Lead, "valorCredito" | "prazoMeses">>;

@Injectable()
export class LeadsRepository {
  constructor(@InjectModel(Lead.name) private readonly leadModel: Model<Lead>) {}

  async create(data: NewLead): Promise<Lead> {
    const created = await this.leadModel.create(data);
    return created.toObject();
  }

  async markEmailSent(protocolo: string): Promise<void> {
    await this.leadModel.updateOne({ protocolo }, { emailEnviado: true });
  }

  findPage(filter: FilterQuery<Lead>, skip: number, limit: number): Promise<Lead[]> {
    return this.leadModel.find(filter).sort({ criadoEm: -1 }).skip(skip).limit(limit).lean<Lead[]>().exec();
  }

  count(filter: FilterQuery<Lead>): Promise<number> {
    return this.leadModel.countDocuments(filter).exec();
  }

  async countByStatus(filter: FilterQuery<Lead>): Promise<Record<LeadStatus, number>> {
    const groups = await this.leadModel
      .aggregate<{ _id: LeadStatus; total: number }>([
        { $match: filter },
        { $group: { _id: "$status", total: { $sum: 1 } } },
      ])
      .exec();

    const summary: Record<LeadStatus, number> = { NOVO: 0, EM_ATENDIMENTO: 0, PROPOSTA: 0, FECHADO: 0, PERDIDO: 0 };
    for (const group of groups) summary[group._id] = group.total;
    return summary;
  }

  updateStatus(protocolo: string, status: LeadStatus): Promise<Lead | null> {
    return this.leadModel.findOneAndUpdate({ protocolo }, { status }, { new: true }).lean<Lead>().exec();
  }
}
