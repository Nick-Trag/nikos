import { Component, OnInit } from '@angular/core';
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
export class PhotographyComponent implements OnInit {
  photos: Photo[] = [];
  rotations: number[] = [];
  translations: number[] = [];

  ngOnInit(): void {
    this.photos = this.shuffle(photos);
    // TODO: Semi-random translations and rotations
    // Maybe just the rotations, and use flex-wrap instead. Because mobile is low-key a nightmare
    // Or maybe actually straight up display: none on the container when on mobile and make a completely different UI. This might be better actually
    // TODO: Animate
    for (let i = 0; i < this.photos.length; i++) { // Need a minimum rotation at least
      this.rotations.push(Math.random() * 70 - 35);
      if (this.rotations[i] > 0 && this.rotations[i] < 15) {
        this.rotations[i] = 15;
      }
      else if (this.rotations[i] <= 0 && this.rotations[i] > -15) {
        this.rotations[i] = -15;
      }

      this.translations.push(Math.random() * 100 - 50);
    }
  }


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
