import { Test, TestingModule } from '@nestjs/testing';
import { SensorProcessorService } from './sensor-processor.service';

describe('SensorProcessorService', () => {
  let service: SensorProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorProcessorService],
    }).compile();

    service = module.get<SensorProcessorService>(SensorProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
