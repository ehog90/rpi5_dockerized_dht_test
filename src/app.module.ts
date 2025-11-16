import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DhtService } from './services/dht/dht.service';
import { BullModule } from '@nestjs/bullmq';
import { SensorProcessorService } from './services/sensor-processor/sensor-processor.service';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT ?? 6379),
      },
    }),
    BullModule.registerQueue({
      name: 'sensor-measures-test',
    }),
  ],
  controllers: [AppController],
  providers: [DhtService, SensorProcessorService],
})
export class AppModule { }
