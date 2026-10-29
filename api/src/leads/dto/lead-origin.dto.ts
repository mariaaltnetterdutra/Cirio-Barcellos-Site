import { IsOptional, IsString, MaxLength } from "class-validator";

const MAX_ORIGIN_LENGTH = 200;

export class LeadOriginDto {
  @IsOptional() @IsString() @MaxLength(MAX_ORIGIN_LENGTH) pagina?: string;
  @IsOptional() @IsString() @MaxLength(MAX_ORIGIN_LENGTH) utmSource?: string;
  @IsOptional() @IsString() @MaxLength(MAX_ORIGIN_LENGTH) utmMedium?: string;
  @IsOptional() @IsString() @MaxLength(MAX_ORIGIN_LENGTH) utmCampaign?: string;
  @IsOptional() @IsString() @MaxLength(MAX_ORIGIN_LENGTH) utmTerm?: string;
  @IsOptional() @IsString() @MaxLength(MAX_ORIGIN_LENGTH) utmContent?: string;
  @IsOptional() @IsString() @MaxLength(MAX_ORIGIN_LENGTH) gclid?: string;
  @IsOptional() @IsString() @MaxLength(MAX_ORIGIN_LENGTH) referrer?: string;
}
