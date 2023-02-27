import Observable from './Observable';
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

afterEach(() => {
  jest.clearAllTimers();
});

const TIMEOUT = 1000;
test('Observable timeout', () => {
  const observable = new Observable((observer) => {
    setInterval(() => {
      observer.next(1);
    }, TIMEOUT);
  });

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), TIMEOUT);

  jest.advanceTimersByTime(TIMEOUT);
  let value;

  const subscription = observable.subscribe((val) => {
    value = val;
  });

  jest.advanceTimersByTime(TIMEOUT);

  expect(value).toBe(1);

  jest.advanceTimersByTime(TIMEOUT);

  expect(value).toBe(2);

  subscription.unsubscribe();

  jest.advanceTimersByTime(TIMEOUT);

  expect(value).toBe(2);
});

test('', () => {
  const observable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);

    setTimeout(() => {
      subscriber.next(4);
      subscriber.complete();
      subscriber.next(5);
    }, 1000);
  });

  let value;
  observable.subscribe((val) => {
    value = val;
  });

  expect(value).toBe(3);

  jest.advanceTimersByTime(TIMEOUT);

  expect(value).toBe(4);

  jest.advanceTimersByTime(TIMEOUT);

  expect(value).toBe(4);
});
