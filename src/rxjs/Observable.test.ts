import { Observable, Subscription } from '.';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

afterEach(() => {
  jest.clearAllTimers();
});

const TIMEOUT = 1000;

test('Observable basics', () => {
  const onNext = jest.fn();
  const observable = new Observable((subscriber) => {
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);

    setTimeout(() => {
      subscriber.next(4);
      subscriber.next(5);
    }, TIMEOUT);
  });

  const observer = {
    onNext,
  };

  observable.subscribe(observer);

  expect(onNext).not.toHaveBeenCalled();

  jest.runAllTimers();

  expect(onNext).toHaveBeenCalledTimes(2);
  expect(onNext).toHaveBeenNthCalledWith(1, 4);
  expect(onNext).toHaveBeenNthCalledWith(2, 5);
});

test('Observable unsubscribe', () => {
  const onNext = jest.fn();
  let counter = 0;
  const observable = new Observable((subscriber) => {
    setInterval(() => {
      subscriber.next(counter++);
    }, TIMEOUT);
  });

  const observer = {
    onNext,
  };

  const subscription = observable.subscribe(observer);

  expect(onNext).not.toHaveBeenCalled();

  jest.advanceTimersByTime(TIMEOUT);

  expect(onNext).toHaveBeenNthCalledWith(1, 0);

  jest.advanceTimersByTime(TIMEOUT);

  expect(onNext).toHaveBeenNthCalledWith(2, 1);

  subscription.unsubscribe();

  jest.advanceTimersByTime(TIMEOUT * 4);

  expect(onNext).toHaveBeenCalledTimes(2);
});

test('Subscription basics', () => {
  const unsubscribe = jest.fn();
  const subscription = new Subscription(unsubscribe);

  subscription.unsubscribe();
  expect(unsubscribe).toHaveBeenCalled();
});

test('Subscription add', () => {
  const unsubscribe1 = jest.fn();
  const unsubscribe2 = jest.fn();
  const subscription = new Subscription(unsubscribe1);

  subscription.add(new Subscription(unsubscribe2));

  subscription.unsubscribe();
  expect(unsubscribe1).toHaveBeenCalled();
  expect(unsubscribe2).toHaveBeenCalled();
});
