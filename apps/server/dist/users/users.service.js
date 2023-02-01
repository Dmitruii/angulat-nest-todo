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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./models/user.model");
const activates_service_1 = require("./../activates/activates.service");
const tokens_service_1 = require("./../tokens/tokens.service");
const uuid_1 = require("uuid");
const create_token_dto_1 = require("../tokens/dto/create-token.dto");
const bcrypt = require('bcrypt');
let UsersService = class UsersService {
    constructor(userRepository, ActivatesService, tokensService) {
        this.userRepository = userRepository;
        this.ActivatesService = ActivatesService;
        this.tokensService = tokensService;
    }
    async createUser(dto) {
        const { password, email } = dto;
        const findUser = await this.userRepository.findOne({ where: { email: email } });
        if (findUser) {
            throw new common_1.HttpException('User with this email already exist', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hashSync(password, +process.env.HASH_LEVEL);
        const user = await this.userRepository.create(Object.assign(Object.assign({}, dto), { password: hashPassword }));
        await this.ActivatesService.createActivate({ isActive: false, activeLink: (0, uuid_1.v4)(), userId: user.id }, user.email);
        const tokenPayload = new create_token_dto_1.CreateTokenDto(user.getDataValue('id'), user.getDataValue('email'));
        const { refreshToken, accessToken } = await this.tokensService.generateTokens(tokenPayload);
        await this.tokensService.saveRefreshToken(refreshToken, user.id);
        return { refreshToken, accessToken };
    }
    async login(user) {
        const { email, password } = user;
        let candidate = await this.userRepository.findOne({ where: { email } });
        if (!candidate) {
            throw new common_1.HttpException(`User with this email address does not exist`, common_1.HttpStatus.BAD_REQUEST);
        }
        candidate = candidate.toJSON();
        const isRigthPassword = await bcrypt.compare(password, candidate.password);
        if (!isRigthPassword) {
            throw new common_1.HttpException(`Bad email or password`, common_1.HttpStatus.BAD_REQUEST);
        }
        const tokenPayload = new create_token_dto_1.CreateTokenDto(candidate.id, candidate.email);
        const { accessToken, refreshToken } = this.tokensService.generateTokens(tokenPayload);
        await this.tokensService.saveRefreshToken(refreshToken, candidate.id);
        return { accessToken, refreshToken };
    }
    async getOneUser(id) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new common_1.HttpException(`User not found`, common_1.HttpStatus.BAD_REQUEST);
        }
        return await this.userRepository.findByPk(id);
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => tokens_service_1.TokensService))),
    __metadata("design:paramtypes", [Object, activates_service_1.ActivatesService,
        tokens_service_1.TokensService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map