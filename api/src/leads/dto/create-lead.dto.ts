import { Transform, Type } from "class-transformer";
import {
  Equals,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from "class-validator";
import { CREDIT_LIMITS, type ConsortiumGoal, GOALS, TERM_LIMITS } from "../leads.constants";
import { LeadOriginDto } from "./lead-origin.dto";

const trim = ({ value }: { value: unknown }) => (typeof value === "string" ? value.trim() : value);

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
  @IsInt({ message: "Informe o valor do crédito em reais." })
  @Min(CREDIT_LIMITS.min, { message: "Valor de crédito abaixo do mínimo." })
  @Max(CREDIT_LIMITS.max, { message: "Valor de crédito acima do máximo." })
  valorCredito?: number;

  @IsOptional()
  @IsInt({ message: "Informe o prazo em meses." })
  @Min(TERM_LIMITS.min, { message: "Prazo abaixo do mínimo." })
  @Max(TERM_LIMITS.max, { message: "Prazo acima do máximo." })
  prazoMeses?: number;

  @Equals(true, { message: "É preciso aceitar ser contatado para enviar o pedido." })
  consentimento!: true;

  @IsOptional()
  @ValidateNested()
  @Type(() => LeadOriginDto)
  origem?: LeadOriginDto;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string;
}
