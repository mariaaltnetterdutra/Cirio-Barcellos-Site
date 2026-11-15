import { Module } from "@nestjs/common";
import { LeadsModule } from "../leads/leads.module";
import { AdminAuthController } from "./admin-auth.controller";
import { AdminAuthGuard } from "./admin-auth.guard";
import { AdminAuthService } from "./admin-auth.service";
import { AdminLeadsController } from "./admin-leads.controller";
import { AdminLeadsService } from "./admin-leads.service";

@Module({
  imports: [LeadsModule],
  controllers: [AdminAuthController, AdminLeadsController],
  providers: [AdminAuthService, AdminAuthGuard, AdminLeadsService],
})
export class AdminModule {}
