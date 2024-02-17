import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP/HTTPS Logger');

  use(req: Request, res: Response, next: () => void) {
    const { method, originalUrl, params, query, body } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const responseTime = Date.now() - start;

      const requestLogsBody = `Request ---> 
        Method: ${method}
        URL: ${originalUrl}
        Params: ${JSON.stringify(params)}
        Query: ${JSON.stringify(query)}
        Body: ${JSON.stringify(body)}
      `;
      const responseLogsBody = `Response <--- 
        Status Code: ${statusCode}
        Status Message: ${statusMessage}
        Response Time: ${responseTime}ms
        body: ${JSON.stringify(res.locals.responseData)}
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
