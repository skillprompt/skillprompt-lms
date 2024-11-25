import { lmsPrisma } from './lms-prisma';

describe('lmsPrisma', () => {
  it('should work', () => {
    expect(lmsPrisma()).toEqual('lms-prisma');
  });
});
