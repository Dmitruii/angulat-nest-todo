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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const tokens_service_1 = require("./../tokens/tokens.service");
const jwt_auth_guard_1 = require("./../guards/jwt-auth-guard");
const common_3 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const users_service_1 = require("./users.service");
const login_user_dto_1 = require("./dto/login-user.dto");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(usersService, tokenService) {
        this.usersService = usersService;
        this.tokenService = tokenService;
    }
    async signup(dto, response) {
        const { refreshToken, accessToken } = await this.usersService.createUser(dto);
        response.cookie('refreshToken', refreshToken, { httpOnly: true });
        return { token: accessToken };
    }
    async signin(dto, response) {
        const { refreshToken, accessToken } = await this.usersService.login(dto);
        response.cookie('refreshToken', refreshToken, { httpOnly: true });
        return { token: accessToken };
    }
    async logout(response, request) {
        const refreshToken = request.cookies.refreshToken;
        await this.tokenService.deleteRefreshToken(refreshToken);
        response.clearCookie('refreshToken', { path: '' });
        throw new common_2.HttpException('Logout successfully', common_1.HttpStatus.OK);
    }
    async getAllUsers() {
        return await this.usersService.getAllUsers();
    }
    async getUser(id) {
        return await this.usersService.getOneUser(id);
    }
};
__decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_3.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_3.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
__decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_3.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_3.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signin", null);
__decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_3.Delete)('logout'),
    __param(0, (0, common_3.Res)({ passthrough: true })),
    __param(1, (0, common_3.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_3.Get)('users'),
    (0, common_3.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_3.Get)('user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
UsersController = __decorate([
    (0, common_3.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        tokens_service_1.TokensService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map