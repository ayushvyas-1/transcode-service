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
exports.TranscodeController = void 0;
const common_1 = require("@nestjs/common");
const transcode_service_1 = require("./transcode.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const bullmq_1 = require("bullmq");
const bull_1 = require("@nestjs/bull");
let TranscodeController = class TranscodeController {
    transcodeService;
    transcodeQueue;
    constructor(transcodeService, transcodeQueue) {
        this.transcodeService = transcodeService;
        this.transcodeQueue = transcodeQueue;
    }
    async transcode(file) {
        console.log('File uploaded:', file);
        const job = await this.transcodeService.transcode(file.filename);
        return { id: job.id, fileName: file.filename };
    }
    async getJobStatus(id) {
        const job = await this.transcodeQueue.getJob(id);
        if (!job) {
            return { status: 'unknown' };
        }
        const isCompleted = await job.isCompleted();
        const Failed = await job.isFailed();
        let status = 'Active';
        if (isCompleted) {
            status = 'Completed';
        }
        else if (Failed) {
            status = 'Failed';
        }
        return { status, id, result: isCompleted ? job.data.fileName.replace('.mp4', '.mp3') : null };
    }
};
exports.TranscodeController = TranscodeController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, callback) => {
                const filename = file.originalname;
                callback(null, filename);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TranscodeController.prototype, "transcode", null);
__decorate([
    (0, common_1.Get)('status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TranscodeController.prototype, "getJobStatus", null);
exports.TranscodeController = TranscodeController = __decorate([
    (0, common_1.Controller)('transcode'),
    __param(1, (0, bull_1.InjectQueue)('transcode')),
    __metadata("design:paramtypes", [transcode_service_1.TranscodeService, bullmq_1.Queue])
], TranscodeController);
//# sourceMappingURL=transcode.controller.js.map