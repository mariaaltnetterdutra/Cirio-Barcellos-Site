import { Body, Controller, Post } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import type { CreateLeadResponseDto } from "./dto/create-lead-response.dto";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { LeadsService } from "./leads.service";

const LEAD_RATE_LIMIT = { limit: 5, ttl: 60_000 };

@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @Throttle({ default: LEAD_RATE_LIMIT })
  create(@Body() dto: CreateLeadDto): Promise<CreateLeadResponseDto> {
    return this.leadsService.create(dto);
  }
}
