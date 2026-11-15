import { Body, Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { ADMIN_RATE_LIMIT } from "./admin.constants";
import { AdminAuthGuard } from "./admin-auth.guard";
import { AdminLeadsService } from "./admin-leads.service";
import type { AdminLeadDto, AdminLeadsPageDto } from "./dto/admin-lead.dto";
import { ListLeadsQueryDto } from "./dto/list-leads-query.dto";
import { UpdateLeadStatusDto } from "./dto/update-lead-status.dto";

@Controller("admin/leads")
@UseGuards(AdminAuthGuard)
@Throttle({ default: ADMIN_RATE_LIMIT })
export class AdminLeadsController {
  constructor(private readonly leadsService: AdminLeadsService) {}

  @Get()
  list(@Query() query: ListLeadsQueryDto): Promise<AdminLeadsPageDto> {
    return this.leadsService.list(query);
  }

  @Patch(":protocolo")
  updateStatus(@Param("protocolo") protocolo: string, @Body() dto: UpdateLeadStatusDto): Promise<AdminLeadDto> {
    return this.leadsService.updateStatus(protocolo, dto.status);
  }
}
