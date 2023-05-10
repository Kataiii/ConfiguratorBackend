import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { SwaggerModule } from "@nestjs/swagger/dist";
import { AppModule } from "./app.module";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import * as cookieParser from 'cookie-parser';

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Конфигуратор')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    const reflector = app.get(Reflector);
    app.useGlobalGuards(new JwtAuthGuard( null ,reflector));
    app.use(cookieParser());
    await app.listen(PORT, () => console.log(`Server start on port = ${PORT}`))
}

start()