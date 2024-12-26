import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rpcError = exception.getError();

    // Consola para debug
    console.log('RpcException:', rpcError);

    // Manejar excepciones con estructura esperada
    if (
      typeof rpcError === 'object' &&
      rpcError !== null &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const { status, message } = rpcError as {
        status: number;
        message: string;
      };
      return response.status(status).json({
        statusCode: status,
        message,
      });
    }

    // Respuesta predeterminada en caso de error no estructurado
    return response.status(400).json({
      statusCode: 400,
      message: rpcError || 'Unexpected RPC error occurred',
    });
  }
}
