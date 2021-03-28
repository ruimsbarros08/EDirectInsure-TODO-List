import { DoneTasksPipe } from './done-tasks.pipe';

describe('DoneTasksPipe', () => {
  it('create an instance', () => {
    const pipe = new DoneTasksPipe();
    expect(pipe).toBeTruthy();
  });
});
