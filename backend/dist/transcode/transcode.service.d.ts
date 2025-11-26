import { Queue } from 'bullmq';
export declare class TranscodeService {
    private readonly transcodeQueue;
    constructor(transcodeQueue: Queue);
    transcode(fileName: string): Promise<import("bullmq").Job<any, any, string>>;
}
