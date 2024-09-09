import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss'
})
export class TravelComponent {
  @ViewChild('map')
  private mapElement!: ElementRef<HTMLElement>;
}
