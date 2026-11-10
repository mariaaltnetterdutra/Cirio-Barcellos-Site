import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { Lead } from "./schemas/lead.schema";

/** Dados que o serviço informa; status, responsável e datas vêm dos padrões do schema. */
export type NewLead = Pick<
  Lead,
  "protocolo" | "nome" | "whatsapp" | "objetivo" | "origem" | "consentimentoEm"
> &
  Partial<Pick<Lead, "valorCredito" | "prazoMeses">>;

// Único ponto que conhece o Mongoose: trocar de banco mexe só aqui.
@Injectable()
export class LeadsRepository {
  constructor(@InjectModel(Lead.name) private readonly leadModel: Model<Lead>) {}

  async create(data: NewLead): Promise<Lead> {
    const created = await this.leadModel.create(data);
    return created.toObject();
  }
}
