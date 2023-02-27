class Observer {
  next: (value: any) => void;
  error: (err: any) => void;
  complete: () => void;
}
