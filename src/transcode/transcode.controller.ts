import { Controller, Post } from '@nestjs/common';
import { TranscodeService } from './transcode.service';

@Controller('transcode')
export class TranscodeController {
  constructor(private readonly transcodeService: TranscodeService) { }

  @Post()
  async transcode() {
    await this.transcodeService.transcode();
    return 'job is added to queue';
  }
}
