import { Job } from "bullmq";
export declare class TranscodeConsumer {
    handleTranscodeJob(job: Job<{
        fileName: string;
    }>): Promise<void>;
}
