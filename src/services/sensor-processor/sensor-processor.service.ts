import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { promises } from 'node-dht-sensor';


@Processor('sensor-measures-test', { concurrency: 1 })
export class SensorProcessorService extends WorkerHost {

    private logger = new Logger(SensorProcessorService.name);


    constructor() {
        super();
    }
    @OnWorkerEvent('completed')
    public async onJobCompleted(job: Job<unknown>) {
        this.logger.log(`Job with id ${job.id} has been completed`);
    }

    @OnWorkerEvent('active')
    public async onJobStarted() {
        this.logger.log(`Job started`);
    }

    async process(job: Job, token?: string) {
        await this.readFromSensor();
    }

    async readFromSensor() {
        const sensorResponse = await promises.read(
            22,
            4,
        );
        try {
            this.logger.log(
                `temp: ${sensorResponse.temperature.toFixed(1)}°C, ` +
                `humidity: ${sensorResponse.humidity.toFixed(1)}%`
            );
        } catch (err) {
            this.logger.error("Failed to read sensor data:", err);
        }
    }
}
