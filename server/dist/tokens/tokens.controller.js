"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensController = void 0;
const tokens_service_1 = require("./tokens.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let TokensController = class TokensController {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    async refresh(request, response) {
        const cookiesRefreshToken = request.cookies.refreshToken;
        const { refreshToken, accessToken } = await this.tokenService.refreshTokens(cookiesRefreshToken);
        response.cookie('refreshToken', refreshToken, { httpOnly: true });
        return { token: accessToken };
    }
};
__decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "refresh", null);
TokensController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [tokens_service_1.TokensService])
], TokensController);
exports.TokensController = TokensController;
//# sourceMappingURL=tokens.controller.js.map