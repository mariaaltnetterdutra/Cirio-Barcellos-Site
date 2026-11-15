import { IsIn } from "class-validator";
import { LEAD_STATUSES, type LeadStatus } from "../../leads/leads.constants";

export class UpdateLeadStatusDto {
  @IsIn(LEAD_STATUSES, { message: "Status inválido." })
  status!: LeadStatus;
}
