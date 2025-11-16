import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DhtService } from './services/dht/dht.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DhtService],
})
export class AppModule { }
