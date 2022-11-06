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
exports.ActivatesService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const activate_model_1 = require("./models/activate.model");
const mail_1 = require("./../configs/mail");
const nodemailer = require('nodemailer');
let ActivatesService = class ActivatesService {
    constructor(activateRepository) {
        this.activateRepository = activateRepository;
    }
    async createActivate(dto, to) {
        let activate = await this.activateRepository.create(dto);
        activate = activate.toJSON();
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: +process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            },
        });
        let message = new mail_1.mailConfig(activate.activeLink, 'dimanaymenko2005@gmail.com', 'Activate link', 'Todo rest api');
        await transporter.sendMail(message);
        return activate;
    }
    async active(id) {
        let activate = await this.activateRepository.findOne({ where: { activeLink: id } });
        if (activate) {
            activate = activate.toJSON();
            if (activate.isActive === true) {
                return `<h1>You have already actived your account</h1>`;
            }
            await activate.update({ isActive: true });
            return `<h1>Success</h1>`;
        }
        throw new common_2.HttpException('Bad activate link', common_1.HttpStatus.BAD_REQUEST);
    }
};
ActivatesService = __decorate([
    (0, common_3.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(activate_model_1.Activate)),
    __metadata("design:paramtypes", [Object])
], ActivatesService);
exports.ActivatesService = ActivatesService;
//# sourceMappingURL=activates.service.js.map