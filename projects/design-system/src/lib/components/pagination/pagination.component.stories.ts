import { Component, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { DsPaginationComponent } from './pagination.component';

const meta: Meta<DsPaginationComponent> = {
  title: 'Components/Navigation/Pagination',
  component: DsPaginationComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      subtitle: "Angular wrapper around Bootstrap's .pagination CSS with correct aria-current and aria-label",
      description: {
        component:
          'Page controls are native `<button>`s — this is action-based navigation that typically drives a data fetch rather than a route change, so there\'s no `href`/`routerLink` here. The current page gets `aria-current="page"`; every button gets a descriptive `aria-label` ("Previous page", "Page 3", …). Long ranges collapse to an ellipsis around the current page, controlled by `siblingCount`. Bind `[(page)]` for two-way sync, or `page` + `(pageChange)` to control it externally.',
      },
    },
  },
  args: {
    page: 1,
    totalPages: 10,
    siblingCount: 1,
    ariaLabel: 'Pagination',
  },
};

export default meta;
type Story = StoryObj<DsPaginationComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<ds-pagination [page]="page" [totalPages]="totalPages" [siblingCount]="siblingCount" [ariaLabel]="ariaLabel" />`,
  }),
};

export const OnAMiddlePage: Story = {
  args: { page: 5 },
  render: Default.render,
};

export const FewPages: Story = {
  parameters: {
    docs: { description: { story: "When every page fits, nothing collapses — no ellipsis is shown." } },
  },
  args: { totalPages: 4, page: 2 },
  render: Default.render,
};

export const ManyPages: Story = {
  args: { totalPages: 50, page: 25, siblingCount: 2 },
  render: Default.render,
};

@Component({
  selector: 'ds-pagination-interactive-demo',
  standalone: true,
  imports: [DsPaginationComponent],
  template: `
    <p class="mb-3">Page {{ page() }} of 12</p>
    <ds-pagination [page]="page()" [totalPages]="12" (pageChange)="page.set($event)" />
  `,
})
class PaginationInteractiveDemoComponent {
  protected readonly page = signal(1);
}

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: 'A realistic usage pattern: `page` and `(pageChange)` kept in sync with a local signal.',
      },
    },
  },
  render: () => ({
    moduleMetadata: { imports: [PaginationInteractiveDemoComponent] },
    template: `<ds-pagination-interactive-demo />`,
  }),
};
