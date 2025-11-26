import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TranscodeService } from './transcode.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bull';

@Controller('transcode')
export class TranscodeController {
  constructor(private readonly transcodeService: TranscodeService, @InjectQueue('transcode') private readonly transcodeQueue: Queue) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const filename = file.originalname;
        callback(null, filename);
      },
    }),
  }),)


  async transcode(@UploadedFile() file: Express.Multer.File) {
    console.log('File uploaded:', file);
    const job = await this.transcodeService.transcode(file.filename);
    return { id: job.id, fileName: file.filename };
  }

  @Get('status/:id')
  async getJobStatus(@Param('id') id: string) {
    const job = await this.transcodeQueue.getJob(id);
    if (!job) {
      return { status: 'unknown' };
    }
    const isCompleted = await job.isCompleted();
    const Failed = await job.isFailed();

    let status = 'Active';
    if (isCompleted) {
      status = 'Completed';
    } else if (Failed) {
      status = 'Failed';
    }
    return { status, id, result: isCompleted ? job.data.fileName.replace('.mp4', '.mp3') : null };
  }
}

