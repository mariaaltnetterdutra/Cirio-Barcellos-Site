import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { ADMIN_LOGIN_RATE_LIMIT } from "./admin.constants";
import { AdminAuthService, type AdminSession } from "./admin-auth.service";
import { AdminLoginDto } from "./dto/admin-login.dto";

@Controller("admin")
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: ADMIN_LOGIN_RATE_LIMIT })
  login(@Body() dto: AdminLoginDto): AdminSession {
    return this.authService.login(dto.senha);
  }
}
