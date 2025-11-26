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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranscodeConsumer = void 0;
const bull_1 = require("@nestjs/bull");
const bullmq_1 = require("bullmq");
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const path_1 = __importDefault(require("path"));
let TranscodeConsumer = class TranscodeConsumer {
    async handleTranscodeJob(job) {
        console.log(`[${job.id}] Start transcoding...`);
        const inputPath = path_1.default.join(__dirname, `../../uploads/${job.data.fileName}`);
        const outputPath = path_1.default.join(__dirname, `../../uploads/${job.data.fileName.replace('.mp4', '.mp3')}`);
        await new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)(inputPath)
                .output(outputPath)
                .on('end', () => {
                console.log(`[${job.id}] Transcoding completed`);
                resolve(true);
            })
                .on('error', (err) => {
                console.log(`[${job.id}] Transcoding failed`);
                reject(err);
            })
                .run();
        });
    }
};
exports.TranscodeConsumer = TranscodeConsumer;
__decorate([
    (0, bull_1.Process)('transcode'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_1.Job]),
    __metadata("design:returntype", Promise)
], TranscodeConsumer.prototype, "handleTranscodeJob", null);
exports.TranscodeConsumer = TranscodeConsumer = __decorate([
    (0, bull_1.Processor)('transcode')
], TranscodeConsumer);
//# sourceMappingURL=transcode.consumer.js.map