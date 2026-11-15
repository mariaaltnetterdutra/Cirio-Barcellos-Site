import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AdminModule } from "./admin/admin.module";
import { type EnvironmentVariables, validateEnvironment } from "./config/env.validation";
import { HealthController } from "./health/health.controller";
import { LeadsModule } from "./leads/leads.module";

const DEFAULT_RATE_LIMIT = { ttl: 60_000, limit: 60 };

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnvironment }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<EnvironmentVariables, true>) => ({
        uri: config.get("MONGODB_URI", { infer: true }),
      }),
    }),
    ThrottlerModule.forRoot([DEFAULT_RATE_LIMIT]),
    LeadsModule,
    AdminModule,
  ],
  controllers: [HealthController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
