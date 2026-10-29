import { Transform, Type } from "class-transformer";
import {
  Equals,
  IsIn,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  ValidateNested,
} from "class-validator";
import {
  BUDGETS,
  type BudgetRange,
  type ConsortiumGoal,
  GOALS,
  TIMEFRAMES,
  type Timeframe,
} from "../leads.constants";
import { LeadOriginDto } from "./lead-origin.dto";

const trim = ({ value }: { value: unknown }) => (typeof value === "string" ? value.trim() : value);

/** O que o formulário da landing envia em POST /leads. */
export class CreateLeadDto {
  @Transform(trim)
  @IsString({ message: "Informe seu nome." })
  @Length(2, 80, { message: "Informe seu nome." })
  nome!: string;

  @Matches(/^\d{10,11}$/, { message: "Informe um WhatsApp com DDD (só números)." })
  whatsapp!: string;

  @IsIn(GOALS, { message: "Escolha um objetivo." })
  objetivo!: ConsortiumGoal;

  @IsOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(80)
  objetivoOutro?: string;

  @IsIn(BUDGETS, { message: "Escolha o valor aproximado." })
  valor!: BudgetRange;

  @IsIn(TIMEFRAMES, { message: "Escolha o prazo." })
  prazo!: Timeframe;

  @Equals(true, { message: "É preciso aceitar ser contatado para enviar o pedido." })
  consentimento!: true;

  @IsOptional()
  @ValidateNested()
  @Type(() => LeadOriginDto)
  origem?: LeadOriginDto;

  /** Campo invisível no site (anti-robô). Gente de verdade deixa vazio. */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;
}
