import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger, ValidationPipe} from "@nestjs/common";
import {HttpExceptionFilter} from "./users/infra/exceptions/http-exception.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const logger = new Logger()

    app.setGlobalPrefix('api')
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    )
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.listen(process.env.PORT || 3000);
    logger.log(`App running on port ${process.env.PORT}`)
}

bootstrap();
