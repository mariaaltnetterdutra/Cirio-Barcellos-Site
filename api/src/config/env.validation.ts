import { plainToInstance } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty, IsString, Max, MinLength, Min, ValidateIf, validateSync } from "class-validator";
import { ADMIN_PASSWORD_MIN_LENGTH, ADMIN_TOKEN_SECRET_MIN_LENGTH } from "../admin/admin.constants";

const NODE_ENVIRONMENTS = ["development", "production", "test"] as const;

function isAdminConfigured(env: EnvironmentVariables): boolean {
  return env.NODE_ENV === "production" || Boolean(env.ADMIN_PASSWORD) || Boolean(env.ADMIN_TOKEN_SECRET);
}

export class EnvironmentVariables {
  @IsIn(NODE_ENVIRONMENTS)
  NODE_ENV: (typeof NODE_ENVIRONMENTS)[number] = "development";

  @IsInt()
  @Min(1)
  @Max(65535)
  PORT: number = 3001;

  @IsString()
  @IsNotEmpty()
  CORS_ORIGIN!: string;

  @IsString()
  @IsNotEmpty()
  MONGODB_URI!: string;

  // Email para a equipe. Em desenvolvimento pode ficar vazio (o texto só aparece no log);
  // em produção, ou assim que SMTP_HOST for preenchido, todos os campos abaixo passam a ser obrigatórios.
  @ValidateIf((env: EnvironmentVariables) => env.NODE_ENV === "production" || Boolean(env.SMTP_HOST))
  @IsString()
  @IsNotEmpty()
  SMTP_HOST?: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  SMTP_PORT: number = 587;

  @ValidateIf((env: EnvironmentVariables) => env.NODE_ENV === "production" || Boolean(env.SMTP_HOST))
  @IsString()
  @IsNotEmpty()
  SMTP_USER?: string;

  @ValidateIf((env: EnvironmentVariables) => env.NODE_ENV === "production" || Boolean(env.SMTP_HOST))
  @IsString()
  @IsNotEmpty()
  SMTP_PASS?: string;

  @ValidateIf((env: EnvironmentVariables) => env.NODE_ENV === "production" || Boolean(env.SMTP_HOST))
  @IsString()
  @IsNotEmpty()
  MAIL_FROM?: string;

  /** Quem recebe os avisos (uma ou mais caixas, separadas por vírgula). */
  @ValidateIf((env: EnvironmentVariables) => env.NODE_ENV === "production" || Boolean(env.SMTP_HOST))
  @IsString()
  @IsNotEmpty()
  MAIL_TO?: string;

  // Painel de leads: só liga quando a senha e o segredo do token estão preenchidos.
  // Em produção, ou se um dos dois for preenchido, os dois passam a ser obrigatórios e precisam ser fortes.
  @ValidateIf(isAdminConfigured)
  @IsString()
  @MinLength(ADMIN_PASSWORD_MIN_LENGTH)
  ADMIN_PASSWORD?: string;

  @ValidateIf(isAdminConfigured)
  @IsString()
  @MinLength(ADMIN_TOKEN_SECRET_MIN_LENGTH)
  ADMIN_TOKEN_SECRET?: string;
}

export function validateEnvironment(config: Record<string, unknown>): EnvironmentVariables {
  const env = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
  const errors = validateSync(env, { skipMissingProperties: false });
  if (errors.length > 0) {
    const missing = errors.map((error) => error.property).join(", ");
    throw new Error(`Variáveis de ambiente inválidas ou faltando: ${missing}. Veja o .env.example.`);
  }
  return env;
}
