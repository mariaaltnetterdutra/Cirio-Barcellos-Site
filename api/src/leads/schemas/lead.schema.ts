import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import type { HydratedDocument } from "mongoose";
import {
  type ConsortiumGoal,
  DEFAULT_RESPONSIBLE,
  GOALS,
  LEAD_STATUSES,
  type LeadStatus,
} from "../leads.constants";

@Schema({ _id: false })
export class LeadOrigin {
  @Prop() pagina?: string;
  @Prop() utmSource?: string;
  @Prop() utmMedium?: string;
  @Prop() utmCampaign?: string;
  @Prop() utmTerm?: string;
  @Prop() utmContent?: string;
  @Prop() gclid?: string;
  @Prop() referrer?: string;
}

const LeadOriginSchema = SchemaFactory.createForClass(LeadOrigin);

@Schema({ collection: "leads", timestamps: { createdAt: "criadoEm", updatedAt: "atualizadoEm" } })
export class Lead {
  @Prop({ required: true, unique: true })
  protocolo!: string;

  @Prop({ required: true, trim: true })
  nome!: string;

  @Prop({ required: true })
  whatsapp!: string;

  @Prop({ required: true, enum: GOALS })
  objetivo!: ConsortiumGoal;

  @Prop()
  valorCredito?: number;

  @Prop()
  prazoMeses?: number;

  @Prop({ type: LeadOriginSchema, default: {} })
  origem!: LeadOrigin;

  @Prop({ required: true })
  consentimentoEm!: Date;

  @Prop({ required: true, enum: LEAD_STATUSES, default: "NOVO" })
  status!: LeadStatus;

  @Prop({ required: true, default: DEFAULT_RESPONSIBLE })
  responsavel!: string;

  @Prop({ required: true, default: false })
  emailEnviado!: boolean;

  criadoEm!: Date;
  atualizadoEm!: Date;
}

export type LeadDocument = HydratedDocument<Lead>;

export const LeadSchema = SchemaFactory.createForClass(Lead);
LeadSchema.index({ criadoEm: -1 });
LeadSchema.index({ status: 1 });
