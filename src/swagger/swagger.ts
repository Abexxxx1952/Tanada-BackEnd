import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function createSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .addCookieAuth('Authentication_accessToken')
    .addCookieAuth('Authentication_refreshToken')
    .setTitle('Travel Blog')
    .setDescription('Travel blog about fictional country named Tanada')
    .setVersion('1.0')
    .addTag('Travel blog API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
