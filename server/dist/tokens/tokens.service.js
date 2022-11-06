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
exports.TokensService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_service_1 = require("../users/users.service");
const create_token_dto_1 = require("./dto/create-token.dto");
const token_model_1 = require("./models/token.model");
const jwt = require('jsonwebtoken');
let TokensService = class TokensService {
    constructor(tokenRepository, usersService) {
        this.tokenRepository = tokenRepository;
        this.usersService = usersService;
    }
    generateTokens(user) {
        const accessToken = jwt.sign(Object.assign({}, user), process.env.JWT_ACCESS_SECRET_TOKEN, { expiresIn: '30m' });
        const refreshToken = jwt.sign(Object.assign({}, user), process.env.JWT_REFRESH_SECRET_TOKEN, { expiresIn: '10d' });
        return { accessToken, refreshToken };
    }
    async saveRefreshToken(refreshToken, userId) {
        const candidate = await this.tokenRepository.findOne({ where: { userId } });
        if (candidate) {
            return await candidate.update({ tokenRefresh: refreshToken });
        }
        const createTokenData = {
            tokenRefresh: refreshToken,
            userId: userId
        };
        return await this.tokenRepository.create(createTokenData);
    }
    async deleteRefreshToken(token) {
        if (!token) {
            throw new common_1.HttpException('Unauthorized user', common_1.HttpStatus.UNAUTHORIZED);
        }
        return await this.tokenRepository.destroy({ where: { tokenRefresh: token } });
    }
    async refreshTokens(token) {
        if (!token) {
            throw new common_1.HttpException('Unauthorized user', common_1.HttpStatus.UNAUTHORIZED);
        }
        const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_TOKEN);
        const findToken = await this.tokenRepository.findOne({ where: { tokenRefresh: token } });
        if (!tokenData || !findToken) {
            throw new common_1.HttpException('Unauthorized user', common_1.HttpStatus.UNAUTHORIZED);
        }
        const user = await this.usersService.getOneUser(tokenData.id);
        if (!user) {
            throw new common_1.HttpException('Unauthorized user', common_1.HttpStatus.UNAUTHORIZED);
        }
        const tokensPayload = new create_token_dto_1.CreateTokenDto(user.id, user.email);
        return this.generateTokens(tokensPayload);
    }
};
TokensService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(token_model_1.Token)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [Object, users_service_1.UsersService])
], TokensService);
exports.TokensService = TokensService;
//# sourceMappingURL=tokens.service.js.map