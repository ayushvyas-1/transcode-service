import { Process, Processor } from "@nestjs/bull";
import { Job } from "bullmq";
import Ffmpeg from "fluent-ffmpeg";
import path from "path";

@Processor('transcode')
export class TranscodeConsumer {
    @Process('transcode')
    async handleTranscodeJob(job: Job<{ fileName: string }>) {

        console.log(`[${job.id}] Start transcoding...`);

        const inputPath = path.join(__dirname, `../../uploads/${job.data.fileName}`);
        const outputPath = path.join(__dirname, `../../uploads/${job.data.fileName.replace('.mp4', '.mp3')}`);
        await new Promise((resolve, reject) => {
            Ffmpeg(inputPath)
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
        })
    }
}