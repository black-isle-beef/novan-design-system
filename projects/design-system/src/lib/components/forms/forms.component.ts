import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DsTextInputComponent } from './text-input/text-input.component';
import { DsFormSelectComponent } from './form-select/form-select.component';
import { DsRadioButtonsComponent } from './radio-buttons/radio-buttons.component';
import { DsCheckboxesComponent } from './checkboxes/checkboxes.component';
import { DsControlSizesComponent } from './control-sizes/control-sizes.component';
import { DsInputGroupComponent } from './input-group/input-group.component';
import { DsRangeSliderComponent } from './range-slider/range-slider.component';
import { DsFormLayoutComponent } from './form-layout/form-layout.component';
import { DsFormValidationComponent } from './form-validation/form-validation.component';

export interface FormSectionNav {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
}

/**
 * Master showcase page composing the 9 standalone Bootstrap Form Control sub-components.
 */
@Component({
  selector: 'ds-forms',
  standalone: true,
  imports: [
    CommonModule,
    DsTextInputComponent,
    DsFormSelectComponent,
    DsRadioButtonsComponent,
    DsCheckboxesComponent,
    DsControlSizesComponent,
    DsInputGroupComponent,
    DsRangeSliderComponent,
    DsFormLayoutComponent,
    DsFormValidationComponent,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ds-forms-suite',
  },
})
export class DsFormsComponent {
  /** Section navigation menu entries. */
  readonly sections: readonly FormSectionNav[] = [
    { id: 'text-input', label: '1. Text Input', icon: 'bi-input-cursor-text' },
    { id: 'form-select', label: '2. Form Select', icon: 'bi-menu-button-wide' },
    { id: 'radio-buttons', label: '3. Radio Buttons', icon: 'bi-ui-radios' },
    { id: 'checkboxes', label: '4. Checkboxes & Switches', icon: 'bi-ui-checks' },
    { id: 'control-sizes', label: '5. General & Sizes', icon: 'bi-sliders' },
    { id: 'input-group', label: '6. Input Group', icon: 'bi-input-cursor' },
    { id: 'range-slider', label: '7. Range Slider', icon: 'bi-sliders2' },
    { id: 'form-layout', label: '8. Layouts', icon: 'bi-grid-1x2' },
    { id: 'form-validation', label: '9. Validation Suite', icon: 'bi-check2-square' },
  ];

  /** Active navigation section for scroll Jumper. */
  readonly activeSection = signal<string>('text-input');
}
