import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { TranscodeModule } from './transcode/transcode.module';

@Module({
  imports: [
    BullModule.forRoot({
      prefix: 'transcode',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TranscodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
