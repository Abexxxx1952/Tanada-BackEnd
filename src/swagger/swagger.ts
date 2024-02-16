import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function createSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Travel blog')
    .setDescription('Travel blog about fictional country named Tanada')
    .setVersion('1.0')
    .addTag('Photos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
