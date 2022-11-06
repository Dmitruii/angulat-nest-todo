"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensModule = void 0;
const users_module_1 = require("./../users/users.module");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../users/models/user.model");
const token_model_1 = require("./models/token.model");
const tokens_controller_1 = require("./tokens.controller");
const tokens_service_1 = require("./tokens.service");
let TokensModule = class TokensModule {
};
TokensModule = __decorate([
    (0, common_1.Module)({
        controllers: [tokens_controller_1.TokensController],
        providers: [tokens_service_1.TokensService],
        imports: [
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            sequelize_1.SequelizeModule.forFeature([user_model_1.User, token_model_1.Token]),
        ],
        exports: [
            tokens_service_1.TokensService
        ]
    })
], TokensModule);
exports.TokensModule = TokensModule;
//# sourceMappingURL=tokens.module.js.map