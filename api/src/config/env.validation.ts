import { plainToInstance } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty, IsString, Max, Min, validateSync } from "class-validator";

const NODE_ENVIRONMENTS = ["development", "production", "test"] as const;

/** Variáveis de ambiente obrigatórias. Se faltar alguma, a API não sobe e diz qual falta. */
export class EnvironmentVariables {
  @IsIn(NODE_ENVIRONMENTS)
  NODE_ENV: (typeof NODE_ENVIRONMENTS)[number] = "development";

  @IsInt()
  @Min(1)
  @Max(65535)
  PORT = 3001;

  @IsString()
  @IsNotEmpty()
  CORS_ORIGIN!: string;

  @IsString()
  @IsNotEmpty()
  MONGODB_URI!: string;
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
