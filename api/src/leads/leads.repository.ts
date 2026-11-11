import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
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
}
