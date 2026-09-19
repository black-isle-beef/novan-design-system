import { TestBed } from '@angular/core/testing';
import { DsToastContainerComponent } from './toast-container.component';
import { DsToastService } from './toast.service';

describe('DsToastContainerComponent', () => {
  async function createFixture() {
    await TestBed.configureTestingModule({ imports: [DsToastContainerComponent] }).compileComponents();
    const fixture = TestBed.createComponent(DsToastContainerComponent);
    const service = TestBed.inject(DsToastService);
    return { fixture, service };
  }

  it('renders nothing while the queue is empty', async () => {
    const { fixture } = await createFixture();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('ds-toast').length).toBe(0);
  });

  it('renders one ds-toast per queued message, in order', async () => {
    const { fixture, service } = await createFixture();
    service.show('First');
    service.show('Second');
    fixture.detectChanges();

    const toasts = fixture.nativeElement.querySelectorAll('ds-toast');
    expect(toasts.length).toBe(2);
    expect(toasts[0].textContent).toContain('First');
    expect(toasts[1].textContent).toContain('Second');
  });

  it('removes a toast from the DOM when the service dismisses it', async () => {
    const { fixture, service } = await createFixture();
    const id = service.show('Saved', { duration: null });
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('ds-toast').length).toBe(1);

    service.dismiss(id);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('ds-toast').length).toBe(0);
  });

  it('defaults to the bottom-end position', async () => {
    const { fixture } = await createFixture();
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('ds-toast-container--bottom-end')).toBe(true);
  });

  it('reflects the position input as a host class', async () => {
    const { fixture } = await createFixture();
    fixture.componentRef.setInput('position', 'top-start');
    fixture.detectChanges();

    expect(fixture.nativeElement.classList.contains('ds-toast-container--top-start')).toBe(true);
    expect(fixture.nativeElement.classList.contains('ds-toast-container--bottom-end')).toBe(false);
  });

  it('dismisses a toast in the queue when its close button is clicked', async () => {
    const { fixture, service } = await createFixture();
    service.show('Saved', { duration: null });
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('.ds-toast__close') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(service.toasts().length).toBe(0);
  });
});
