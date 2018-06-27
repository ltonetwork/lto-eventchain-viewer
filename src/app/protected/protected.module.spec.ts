import { ProtectedModule } from './protected.module';

describe('ProtectedModule', () => {
  let protectedModule: ProtectedModule;

  beforeEach(() => {
    protectedModule = new ProtectedModule();
  });

  it('should create an instance', () => {
    expect(protectedModule).toBeTruthy();
  });
});
