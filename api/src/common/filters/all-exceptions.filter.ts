import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import type { Response } from "express";

interface ErrorBody {
  statusCode: number;
  message: string | string[];
}

const DEFAULT_MESSAGES: Partial<Record<number, string>> = {
  [HttpStatus.BAD_REQUEST]: "Dados inválidos.",
  [HttpStatus.NOT_FOUND]: "Endereço não encontrado.",
  [HttpStatus.TOO_MANY_REQUESTS]: "Muitos envios seguidos. Aguarde um minuto e tente de novo.",
};

const INTERNAL_ERROR_MESSAGE = "Erro interno. Tente novamente em instantes.";

function hasMessage(value: unknown): value is { message: string | string[] } {
  return typeof value === "object" && value !== null && "message" in value;
}

/** Respostas de erro sempre em português e sem detalhes internos (stack, banco, etc.). */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const body = this.toErrorBody(exception);
    response.status(body.statusCode).json(body);
  }

  private toErrorBody(exception: unknown): ErrorBody {
    if (!(exception instanceof HttpException)) {
      this.logger.error("Erro inesperado", exception instanceof Error ? exception.stack : String(exception));
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: INTERNAL_ERROR_MESSAGE };
    }

    const statusCode = exception.getStatus();
    const payload = exception.getResponse();
    // Erros de validação já vêm com as mensagens em português definidas nos DTOs.
    if (statusCode === HttpStatus.BAD_REQUEST && hasMessage(payload) && Array.isArray(payload.message)) {
      return { statusCode, message: payload.message };
    }
    return { statusCode, message: DEFAULT_MESSAGES[statusCode] ?? exception.message };
  }
}
