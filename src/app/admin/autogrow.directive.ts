import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'textarea[appAutoGrow]',
  standalone: true,
})
export class AutoGrowDirective {
  constructor(private element: ElementRef) {}

  @HostListener('input')
  onInput(): void {
    this.adjust();
  }

  adjust(): void {
    const textarea = this.element.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
