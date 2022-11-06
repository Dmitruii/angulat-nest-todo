"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const activate_model_1 = require("./activates/models/activate.model");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const users_module_1 = require("./users/users.module");
const user_model_1 = require("./users/models/user.model");
const activates_module_1 = require("./activates/activates.module");
const tokens_module_1 = require("./tokens/tokens.module");
const token_model_1 = require("./tokens/models/token.model");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.${process.env.NODE_ENV}.env`
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                models: [user_model_1.User, token_model_1.Token, activate_model_1.Activate],
                autoLoadModels: true
            }),
            users_module_1.UsersModule,
            activates_module_1.ActivatesModule,
            tokens_module_1.TokensModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map