import { TranscodeService } from './transcode.service';
import { Queue } from 'bullmq';
export declare class TranscodeController {
    private readonly transcodeService;
    private readonly transcodeQueue;
    constructor(transcodeService: TranscodeService, transcodeQueue: Queue);
    transcode(file: Express.Multer.File): Promise<{
        id: string | undefined;
        fileName: string;
    }>;
    getJobStatus(id: string): Promise<{
        status: string;
        id?: undefined;
        result?: undefined;
    } | {
        status: string;
        id: string;
        result: any;
    }>;
}
