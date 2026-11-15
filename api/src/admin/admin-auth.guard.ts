import { type CanActivate, type ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import { AdminAuthService } from "./admin-auth.service";

const BEARER_PREFIX = "Bearer ";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly authService: AdminAuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const header = context.switchToHttp().getRequest<Request>().headers.authorization;
    const token = header?.startsWith(BEARER_PREFIX) ? header.slice(BEARER_PREFIX.length) : undefined;

    if (!token || !this.authService.isTokenValid(token)) {
      throw new UnauthorizedException("Sessão expirada. Entre novamente.");
    }
    return true;
  }
}
