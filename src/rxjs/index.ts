type Subscriber = any;
type observableFn = (subscriber: Subscriber) => void;
type ObserverProps = any;
class Observer {
  onNext: (value: any) => void;
  onError: (value: any) => void;
  onComplete: () => void;

  constructor(...props: ObserverProps) {
    if (typeof props[0] === 'function') {
      this.onNext = props[0];
      this.onError = props[1];
      this.onComplete = props[2];
    } else if (typeof props[0] === 'object') {
      this.onNext = props[0].onNext;
      this.onError = props[0].onError;
      this.onComplete = props[0].onComplete;
    } else {
      throw new Error('Invalid Observer');
    }
  }
}

export class Subscription {
  _unsubscribe: () => void;
  _subscriptions: Subscription[] = [];

  constructor(unsubscribe: () => void) {
    this._unsubscribe = unsubscribe;
  }

  unsubscribe() {
    if (this._unsubscribe) {
      this._unsubscribe();
    }

    if (this._subscriptions.length) {
      this._subscriptions.forEach((subscription) => subscription.unsubscribe());
    }
  }

  add(subscription: Subscription) {
    this._subscriptions.push(subscription);
  }

  remove(subscription: Subscription) {
    this._subscriptions.splice(
      this._subscriptions.findIndex((s) => s === subscription),
      1
    );
  }
}
export class Observable {
  _fn: observableFn;
  _isComplete: boolean = false;
  _observers: Observer[] = [];
  _subscription: Subscription;

  static create(fn: observableFn) {
    return new Observable(fn);
  }

  constructor(fn: observableFn) {
    this._fn = fn;
  }

  subscribe(...observerProps: ObserverProps) {
    const observer = new Observer(...observerProps);

    if (!this._observers.length) {
      const subscriptionFn: any = this._fn({ next: this.next.bind(this), onComplete: this.complete.bind(this) });
      this._subscription = new Subscription(subscriptionFn);
    }

    this._observers.push(observer);

    return new Subscription(() => {
      this._observers.splice(
        this._observers.findIndex((o) => o === observer),
        1
      );

      if (this._observers.length === 0) {
        this._subscription.unsubscribe();
      }
    });
  }

  next(value: any) {
    if (!this._isComplete) {
      this._observers.forEach((observer) => observer.onNext(value));
    }
  }

  complete() {
    this._isComplete = true;
    this._observers.forEach((observer) => observer.onComplete());
  }

  error(value: any) {
    this._observers.forEach((observer) => observer.onError(value));
  }

  pipe(...fns: any[]) {
    return fns.reduce(
      (prevFn, nextFn) => (value) => nextFn(prevFn(value)),
      (value) => value
    );
  }
}

const ajax = (url, opts) =>
  new Observable((subscriber) => {
    fetch(url, opts).then(subscriber.next, subscriber.error).finally(subscriber.complete);
  });

const fromPromise = (promise) =>
  new Observable((subscriber) => {
    promise.then(subscriber.next, subscriber.error).finally(subscriber.complete);
  });

class Subject extends Observable {
  subscribe(...observerProps: any): Subscription {
    const observer = new Observer(...observerProps);
    this._observers.push(observer);

    return new Subscription(() => {
      this._observers.splice(
        this._observers.findIndex((o) => o === observer),
        1
      );
    });
  }
}
