"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscodeModule = void 0;
const common_1 = require("@nestjs/common");
const transcode_service_1 = require("./transcode.service");
const transcode_controller_1 = require("./transcode.controller");
const bull_1 = require("@nestjs/bull");
const transcode_consumer_1 = require("./transcode.consumer");
let TranscodeModule = class TranscodeModule {
};
exports.TranscodeModule = TranscodeModule;
exports.TranscodeModule = TranscodeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: 'transcode',
            }),
        ],
        controllers: [transcode_controller_1.TranscodeController],
        providers: [transcode_service_1.TranscodeService, transcode_consumer_1.TranscodeConsumer],
    })
], TranscodeModule);
//# sourceMappingURL=transcode.module.js.map