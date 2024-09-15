import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get a cache entry', () => {
    const key = 'testKey';
    const data = { value: 'testData' };

    service.set(key, data);
    const cachedData = service.get(key);

    expect(cachedData).toEqual(data);
  });

  it('should return null for expired cache entry', () => {
    const key = 'testKey';
    const data = { value: 'testData' };

    jest.spyOn(Date, 'now').mockReturnValueOnce(0); // Mock current time
    service.set(key, data);

    jest.spyOn(Date, 'now').mockReturnValueOnce(60001); // Mock time after cache expiry
    const cachedData = service.get(key);

    expect(cachedData).toBeNull();
  });

  it('should clear a cache entry', () => {
    const key = 'testKey';
    const data = { value: 'testData' };

    service.set(key, data);
    service.clear(key);
    const cachedData = service.get(key);

    expect(cachedData).toBeNull();
  });

  it('should clear all cache entries', () => {
    const key1 = 'testKey1';
    const key2 = 'testKey2';
    const data1 = { value: 'testData1' };
    const data2 = { value: 'testData2' };

    service.set(key1, data1);
    service.set(key2, data2);
    service.clearAll();

    expect(service.get(key1)).toBeNull();
    expect(service.get(key2)).toBeNull();
  });
});
