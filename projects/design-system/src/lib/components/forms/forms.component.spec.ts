import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsFormsComponent } from './forms.component';
import { DsIndeterminateDirective } from './checkboxes/indeterminate.directive';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [DsIndeterminateDirective],
  template: `<input type="checkbox" id="testCheckbox" [dsIndeterminate]="isIndeterminate()">`,
})
class TestHostComponent {
  readonly isIndeterminate = signal(true);
}

describe('DsFormsComponent', () => {
  let component: DsFormsComponent;
  let fixture: ComponentFixture<DsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsFormsComponent, TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the forms showcase component', () => {
    expect(component).toBeTruthy();
  });

  it('should render section navigation items', () => {
    expect(component.sections.length).toBe(9);
  });

  it('renders the section jumper as a labelled nav marking the active section', () => {
    const nav: HTMLElement = fixture.nativeElement.querySelector('nav[aria-label="Form control sections"]');
    const links = Array.from<HTMLAnchorElement>(nav.querySelectorAll('a'));
    expect(links.length).toBe(9);
    expect(links.map((link) => link.getAttribute('aria-current'))).toEqual(['true', ...Array(8).fill(null)]);

    links[2].click();
    fixture.detectChanges();

    expect(links[2].getAttribute('aria-current')).toBe('true');
    expect(links[0].hasAttribute('aria-current')).toBe(false);
  });

  it('keeps headings in order below the page h1', () => {
    const levels = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((heading) =>
      Number(heading.tagName[1]),
    );
    expect(levels[0]).toBe(1);
    levels.slice(1).forEach((level, i) => expect(level - levels[i]).toBeLessThanOrEqual(1));
  });
});

describe('DsIndeterminateDirective', () => {
  it('should set native DOM element indeterminate property', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const checkbox: HTMLInputElement = hostFixture.nativeElement.querySelector('#testCheckbox');
    expect(checkbox.indeterminate).toBe(true);

    hostFixture.componentInstance.isIndeterminate.set(false);
    hostFixture.detectChanges();

    expect(checkbox.indeterminate).toBe(false);
  });
});
