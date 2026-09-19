import { TestBed } from '@angular/core/testing';
import { DsToastService } from './toast.service';

describe('DsToastService', () => {
  let service: DsToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DsToastService);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts with an empty queue', () => {
    expect(service.toasts()).toEqual([]);
  });

  it('queues a toast with defaults', () => {
    service.show('Saved');

    const [toast] = service.toasts();
    expect(toast.message).toBe('Saved');
    expect(toast.variant).toBe('info');
    expect(toast.title).toBeNull();
    expect(toast.dismissible).toBe(true);
    expect(toast.duration).toBe(5000);
  });

  it('returns a unique id for each toast', () => {
    const first = service.show('First');
    const second = service.show('Second');

    expect(first).not.toBe(second);
    expect(service.toasts().map((toast) => toast.id)).toEqual([first, second]);
  });

  it('supports variant convenience methods', () => {
    service.success('Saved');
    service.warning('Careful');
    service.danger('Failed');
    service.info('FYI');

    expect(service.toasts().map((toast) => toast.variant)).toEqual(['success', 'warning', 'danger', 'info']);
  });

  it('auto-dismisses after the given duration', () => {
    service.show('Saved', { duration: 1000 });
    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(999);
    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(1);
    expect(service.toasts().length).toBe(0);
  });

  it('never auto-dismisses when duration is null', () => {
    service.show('Sticky', { duration: null });

    vi.advanceTimersByTime(1_000_000);
    expect(service.toasts().length).toBe(1);
  });

  it('removes a toast immediately when dismiss() is called', () => {
    const id = service.show('Saved', { duration: null });

    service.dismiss(id);

    expect(service.toasts()).toEqual([]);
  });

  it('removes every toast when clear() is called', () => {
    service.show('One');
    service.show('Two');

    service.clear();

    expect(service.toasts()).toEqual([]);
  });

  it('pauses and resumes the auto-dismiss timer with the remaining time', () => {
    const id = service.show('Saved', { duration: 1000 });

    vi.advanceTimersByTime(600);
    service.pause(id);

    // Well past the original duration — paused, so it must not have fired.
    vi.advanceTimersByTime(1000);
    expect(service.toasts().length).toBe(1);

    service.resume(id);
    vi.advanceTimersByTime(399);
    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(1);
    expect(service.toasts().length).toBe(0);
  });

  it('ignores pause()/resume() for an id that is not tracked', () => {
    expect(() => service.pause('unknown')).not.toThrow();
    expect(() => service.resume('unknown')).not.toThrow();
  });
});
