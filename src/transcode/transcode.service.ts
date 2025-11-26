import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class TranscodeService {
    constructor(@InjectQueue('transcode') private readonly transcodeQueue: Queue) { }

    async transcode() {
        await this.transcodeQueue.add('transcode', { fileName: './File.mp4' });
    }
}
