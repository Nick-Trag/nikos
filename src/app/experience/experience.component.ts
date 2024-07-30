import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements AfterViewInit {
  protected inView = false;

  @ViewChild('container') container: ElementRef | undefined;

  ngAfterViewInit(): void {
    if (this.container !== undefined) {
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          this.inView = true;
          observer.unobserve(entries[0].target);
        }
      }, {threshold: 0.4}); // TODO: Check threshold for small screens
      intersectionObserver.observe(this.container.nativeElement);
    }
    else {
      this.inView = true;
    }
  }
}
