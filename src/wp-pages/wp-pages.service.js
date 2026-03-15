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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WpPagesService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
let WpPagesService = class WpPagesService {
    constructor() {
        this.wpPages = this.loadJson('wp-allpages.json');
    }
    loadJson(file) {
        try {
            const filePath = (0, path_1.join)(process.cwd(), 'data', file);
            const content = (0, fs_1.readFileSync)(filePath, 'utf8');
            return JSON.parse(content);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(`Impossible de charger ${file}`);
        }
    }
    getWpPages() {
        return this.wpPages;
    }
};
exports.WpPagesService = WpPagesService;
exports.WpPagesService = WpPagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], WpPagesService);
