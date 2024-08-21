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
  photos: Photo[] = this.shuffle(photos);

  // Shuffle an array and return the shuffled version. Reference: https://stackoverflow.com/a/2450976/7400287
  private shuffle(array: Photo[]) {
    const photos = array.slice();
    let currentIndex = photos.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [photos[currentIndex], photos[randomIndex]] = [
        photos[randomIndex], photos[currentIndex]];
    }
    return photos;
  }
}
