"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivatesModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const activates_controller_1 = require("./activates.controller");
const activates_service_1 = require("./activates.service");
const activate_model_1 = require("./models/activate.model");
let ActivatesModule = class ActivatesModule {
};
ActivatesModule = __decorate([
    (0, common_1.Module)({
        controllers: [activates_controller_1.ActivatesController],
        providers: [activates_service_1.ActivatesService],
        exports: [activates_service_1.ActivatesService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([activate_model_1.Activate]),
        ]
    })
], ActivatesModule);
exports.ActivatesModule = ActivatesModule;
//# sourceMappingURL=activates.module.js.map