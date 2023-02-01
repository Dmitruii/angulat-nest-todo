"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require('jsonwebtoken');
let JwtAuthGuard = class JwtAuthGuard {
    canActivate(context) {
        const { authorization } = context.switchToHttp().getRequest().headers;
        if (!authorization) {
            throw new common_1.HttpException('Unauthorized user', common_1.HttpStatus.UNAUTHORIZED);
        }
        const accessToken = authorization.split(' ')[1];
        if (!accessToken) {
            throw new common_1.HttpException('Unauthorized user', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_TOKEN);
        }
        catch (e) {
            throw new common_1.HttpException('Unauthorized user', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt-auth-guard.js.map