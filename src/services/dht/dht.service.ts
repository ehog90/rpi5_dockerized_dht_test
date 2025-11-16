import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { promises } from 'node-dht-sensor';

@Injectable()
export class DhtService implements OnModuleInit, OnModuleDestroy {

    private logger = new Logger(DhtService.name);
    private intervalId: NodeJS.Timeout | null = null;


    onModuleInit() {
        this.intervalId = setInterval(() => {
            this.readFromSensor();
        }, 10_000)
    }

    onModuleDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
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


var sensor = require("node-dht-sensor").promises;

const test_port = 4

// You can use `initialize` and `setMaxTries` just like before
sensor.setMaxRetries(10);
sensor.initialize(22, test_port);

// You can still use the synchronous version of `read`:
// var readout = sensor.readSync(22, 4);

sensor.read(22, test_port).then(
    function (res) {
        console.log(
            `temp: ${res.temperature.toFixed(1)}°C, ` +
            `humidity: ${res.humidity.toFixed(1)}%`
        );
    },
    function (err) {
        console.error("Failed to read sensor data:", err);
    }
);