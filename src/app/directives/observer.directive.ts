import { AfterViewInit, Directive, ElementRef, inject, Input, WritableSignal } from '@angular/core';

@Directive({
  selector: '[appObserver]',
  standalone: true
})
// Uses IntersectionObserver to detect if an item comes into view, and updates a given signal accordingly
export class ObserverDirective implements AfterViewInit {
  @Input() threshold: number = 0.4;
  @Input({ required: true }) inViewSignal!: WritableSignal<boolean>;
  private element = inject(ElementRef);

  constructor() { }

  ngAfterViewInit(): void {
    if (this.element !== undefined) {
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          this.inViewSignal.set(true);
          observer.unobserve(entries[0].target);
        }
      }, {threshold: this.threshold});
      intersectionObserver.observe(this.element.nativeElement);
    }
    else {
      this.inViewSignal.set(true);
    }
  }
}
