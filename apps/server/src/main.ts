import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ValidationPipe } from './pipes/validation.pipe'
import * as cookieParser from 'cookie-parser';
import { ExpressAdapter } from '@nestjs/platform-express';

const PORT = process.env.PORT ?? 3000
const DOC_URL = 'docs'

async function start() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(), { cors: false })

  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
  });
  
  const config = new DocumentBuilder()
      .setTitle('Angular, Nest todo')
      .setDescription('Documentation rest api')
      .setVersion('1.0')
      .addTag('Auth')
      .addTag('Users')
      .addTag('Mail activate')
      .addTag('Task')
      .addTag('Tasks folder')
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(DOC_URL, app, document)

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on ${PORT} PORT`))
}

start()