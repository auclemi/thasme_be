"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WpPagesModule = void 0;
const common_1 = require("@nestjs/common");
const wp_pages_controller_1 = require("./wp-pages.controller");
const wp_pages_service_1 = require("./wp-pages.service");
let WpPagesModule = class WpPagesModule {
};
exports.WpPagesModule = WpPagesModule;
exports.WpPagesModule = WpPagesModule = __decorate([
    (0, common_1.Module)({
        controllers: [wp_pages_controller_1.WpPagesController],
        providers: [wp_pages_service_1.WpPagesService],
        exports: [wp_pages_service_1.WpPagesService],
    })
], WpPagesModule);
