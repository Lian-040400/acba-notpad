import { TestBed } from '@angular/core/testing';

import { ServerInterceptor } from './server.interceptor';

describe('ServerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ServerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ServerInterceptor = TestBed.inject(ServerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
