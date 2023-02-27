interface Observer {
  next: (value: any) => void;
  error: (err: any) => void;
  complete: () => void;
}

class Subcription {
  _unsubscribe: Function;

  constructor(unsubscribe: Function) {
    this._unsubscribe = unsubscribe;
  }

  unsubscribe() {
    if (this._unsubscribe) this._unsubscribe();
  }
}

class Observable {
  _subscriber: Function;

  constructor(fn: Function) {
    this._subscriber = fn;
  }

  subscribe(cb) {
    const observer = { next: (cb) => {}, error: () => {}, complete: () => {} };
    this._subscriber(observer);

    return new Subcription(() => {
      observer.complete();
    });
  }
}
