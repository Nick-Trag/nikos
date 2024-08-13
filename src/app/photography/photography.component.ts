import { Component } from '@angular/core';
import { Photo, photos } from "../photos";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-photography',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.scss'
})
export class PhotographyComponent {
  photos: Photo[] = photos;
}
