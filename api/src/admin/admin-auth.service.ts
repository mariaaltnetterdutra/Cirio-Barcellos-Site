import { createHash, timingSafeEqual } from "node:crypto";
import { Injectable, Logger, ServiceUnavailableException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { EnvironmentVariables } from "../config/env.validation";
import { ADMIN_TOKEN_TTL_MS } from "./admin.constants";
import { createAdminToken, isAdminTokenValid } from "./admin-token";

export interface AdminSession {
  token: string;
  expiraEm: string;
}

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

@Injectable()
export class AdminAuthService {
  private readonly logger = new Logger(AdminAuthService.name);
  private readonly password?: string;
  private readonly secret?: string;

  constructor(config: ConfigService<EnvironmentVariables, true>) {
    this.password = config.get("ADMIN_PASSWORD", { infer: true });
    this.secret = config.get("ADMIN_TOKEN_SECRET", { infer: true });
  }

  /** O painel só existe quando a senha e o segredo do token estão no .env. */
  private get credentials(): { password: string; secret: string } | undefined {
    return this.password && this.secret ? { password: this.password, secret: this.secret } : undefined;
  }

  login(password: string, now: Date = new Date()): AdminSession {
    const credentials = this.credentials;
    if (!credentials) throw new ServiceUnavailableException("O painel não está ativado neste ambiente.");

    // Compara os hashes, que têm sempre o mesmo tamanho, para o tempo de resposta não revelar a senha.
    if (!timingSafeEqual(digest(password), digest(credentials.password))) {
      this.logger.warn("Tentativa de entrada no painel com senha incorreta.");
      throw new UnauthorizedException("Senha incorreta.");
    }

    const expiresAt = now.getTime() + ADMIN_TOKEN_TTL_MS;
    return { token: createAdminToken(credentials.secret, expiresAt), expiraEm: new Date(expiresAt).toISOString() };
  }

  isTokenValid(token: string, now: Date = new Date()): boolean {
    const credentials = this.credentials;
    return credentials !== undefined && isAdminTokenValid(token, credentials.secret, now.getTime());
  }
}
