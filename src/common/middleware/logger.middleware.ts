import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP/HTTPS Logger');

  use(req: any, res: any, next: () => void) {
    const { method, originalUrl, params, query } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const responseTime = Date.now() - start;

      const requestLogsBody = `Request ---> 
        Method: ${method}
        URL: ${originalUrl}
        Params: ${JSON.stringify(params)}
        Query: ${JSON.stringify(query)}
        Body: ${JSON.stringify(res.locals.requestData)}
      `;
      const responseLogsBody = `Response <--- 
        Status Code: ${statusCode}
        Status Message: ${statusMessage}
        Response Time: ${responseTime}ms
        Body: ${JSON.stringify(res.locals.responseData)}
      `;

      if (statusCode >= 500) {
        this.logger.error(requestLogsBody);
        this.logger.error(responseLogsBody);
        return;
      }

      if (statusCode >= 400) {
        this.logger.warn(requestLogsBody);
        this.logger.warn(responseLogsBody);
        return;
      }

      this.logger.log(requestLogsBody);
      this.logger.log(responseLogsBody);
    });

    next();
  }
}
