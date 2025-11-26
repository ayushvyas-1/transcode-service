import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { TranscodeService } from './transcode.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('transcode')
export class TranscodeController {
  constructor(private readonly transcodeService: TranscodeService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const filename = `${Date.now()}-${file.originalname}`;
        callback(null, filename);
      },
    }),
  }),)


  async transcode(@UploadedFile() file: Express.Multer.File) {
    console.log('File uploaded:', file);
    await this.transcodeService.transcode(file.filename);
    return { message: 'Video uploaded and queued for transcoding', fileName: file.filename };
  }
}

