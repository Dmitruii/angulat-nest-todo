"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const validation_pipe_1 = require("./pipes/validation.pipe");
const cookieParser = require("cookie-parser");
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
const DOC_URL = 'api';
async function start() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Angular, Nest todo')
        .setDescription('Documentation rest api')
        .setVersion('1.0')
        .addTag('Auth')
        .addTag('Users')
        .addTag('Mail activate')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(DOC_URL, app, document);
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    await app.listen(PORT, () => console.log(`Server started on ${PORT} PORT`));
}
start();
//# sourceMappingURL=main.js.map