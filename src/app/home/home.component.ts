import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('inView', [
      state('false', style({ translate: '0 -20%', opacity: 0 })),
      state('true', style({ translate: '0 0', opacity: 1 })),
      transition('false => true', [animate('1s ease-out')]),
    ])
  ],
})
export class HomeComponent implements OnInit {
  // private element = inject(ElementRef);
  protected inView: boolean = false;

  constructor() {

  }

  ngOnInit(): void {
    // console.log(this.element.nativeElement.offsetTop);
    setTimeout(() => {
      this.inView = true;
    }, 5000);
  }
}
