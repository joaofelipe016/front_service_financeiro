import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <input
      [type]="type"
      [name]="name"
      [placeholder]="placeholder"
      [value]="value"
      [disabled]="disabled"
      [class]="inputClasses"
      (input)="onInput($event)"
      (blur)="onBlur()"
      (focus)="onFocus()"
    />
  `,
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() error: boolean = false;
  @Input() success: boolean = false;

  value: string = '';
  isFocused: boolean = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  get inputClasses(): string {
    const baseClasses = 'animatable w-full bg-white/20 backdrop-blur-sm placeholder:text-white/50 focus:bg-white/30 focus:placeholder:text-white/70 shadow-lg focus:shadow-xl focus:shadow-cyan-500/20 border';

    const stateClasses = this.error
      ? 'border-red-500 focus:border-red-400'
      : this.success
        ? 'border-green-500 focus:border-green-400'
        : 'border-white/10 focus:border-white/30';

    return `${baseClasses} ${stateClasses}`;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
