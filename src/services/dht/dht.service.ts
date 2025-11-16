import { Injectable, Logger, OnModuleDestroy, OnModuleInit, } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { promises } from 'node-dht-sensor';

@Injectable()
export class DhtService implements OnModuleInit, OnModuleDestroy {

    private logger = new Logger(DhtService.name);
    private intervalId: NodeJS.Timeout | null = null;


    constructor(
        @InjectQueue('sensor-measures')
        private readonly sensorQueue: Queue<unknown>
    ) {

    }

    onModuleInit() {
        this.intervalId = setInterval(() => {
            this.sensorQueue.add('read-sensor', {});
        }, 10_000)
    }

    onModuleDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }



}