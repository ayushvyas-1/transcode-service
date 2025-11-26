import { Module } from '@nestjs/common';
import { TranscodeService } from './transcode.service';
import { TranscodeController } from './transcode.controller';
import { BullModule } from '@nestjs/bull';
import { TranscodeConsumer } from './transcode.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'transcode',
    }),
  ],
  controllers: [TranscodeController],
  providers: [TranscodeService, TranscodeConsumer],
})
export class TranscodeModule { }
