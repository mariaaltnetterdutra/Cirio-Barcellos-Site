import { Transform, Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";
import { type ConsortiumGoal, GOALS, LEAD_STATUSES, type LeadStatus } from "../../leads/leads.constants";
import { LEADS_PAGE_SIZE, SEARCH_MAX_LENGTH } from "../admin.constants";

const trim = ({ value }: { value: unknown }) => (typeof value === "string" ? value.trim() : value);

export class ListLeadsQueryDto {
  @IsOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(SEARCH_MAX_LENGTH)
  busca?: string;

  @IsOptional()
  @IsIn(LEAD_STATUSES, { message: "Status inválido." })
  status?: LeadStatus;

  @IsOptional()
  @IsIn(GOALS, { message: "Objetivo inválido." })
  objetivo?: ConsortiumGoal;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pagina: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(LEADS_PAGE_SIZE.max)
  limite: number = LEADS_PAGE_SIZE.default;
}
