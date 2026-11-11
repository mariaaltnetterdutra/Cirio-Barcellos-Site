import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MailModule } from "../mail/mail.module";
import { LeadsController } from "./leads.controller";
import { LeadsRepository } from "./leads.repository";
import { LeadsService } from "./leads.service";
import { Lead, LeadSchema } from "./schemas/lead.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }]), MailModule],
  controllers: [LeadsController],
  providers: [LeadsService, LeadsRepository],
})
export class LeadsModule {}
