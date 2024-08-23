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
    this.rotations = Array(this.photos.length).fill(20);
    this.translations = Array(this.photos.length).fill(200);
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
