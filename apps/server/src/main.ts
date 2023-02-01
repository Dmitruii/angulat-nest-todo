import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { ValidationPipe } from './pipes/validation.pipe'
import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT ?? 3000
const DOC_URL = 'docs'

async function start() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.use(cookieParser())
  app.enableCors();

  const config = new DocumentBuilder()
      .setTitle('Angular, Nest todo')
      .setDescription('Documentation rest api')
      .setVersion('1.0')
      .addTag('Auth')
      .addTag('Users')
      .addTag('Mail activate')
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(DOC_URL, app, document)

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on ${PORT} PORT`))
}

start()