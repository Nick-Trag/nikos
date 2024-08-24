import { Component, OnInit } from '@angular/core';
import { Photo, photos } from "../photos";
import { NgClass, NgStyle } from "@angular/common";

@Component({
  selector: 'app-photography',
  standalone: true,
  imports: [
    NgClass,
    NgStyle
  ],
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.scss'
})
export class PhotographyComponent implements OnInit {
  photos: Photo[] = [];
  rotations: number[] = [];
  translationsX: number[] = [];
  translationsY: number[] = [];
  zIndices: number[] = [];
  // styles: object[] = [];

  ngOnInit(): void {
    this.photos = this.shuffle(photos);
    // TODO: Animate
    for (let i = 0; i < this.photos.length; i++) {
      this.rotations.push(Math.random() * 70 - 35); // Rotations from -35deg to 35deg

      // Polaroids look bad if they are too straight, so enforce a 15-degree rotation minimum
      if (this.rotations[i] > 0 && this.rotations[i] < 15) {
        this.rotations[i] = 15;
      }
      else if (this.rotations[i] <= 0 && this.rotations[i] > -15) {
        this.rotations[i] = -15;
      }

      this.translationsX.push(Math.random() * 100 - 50); // Translations from -50px to 50px
      this.translationsY.push(Math.random() * 100 - 50);
      this.zIndices.push(Math.floor(Math.random() * 20) + 1); // TODO: Not sure if I want random z-indices

      // this.styles.push({
      //   'z-index': this.zIndices[i],
      //   'translate': this.translationsX[i] + 'px ' + this.translationsY[i] + 'px',
      //   'rotate': this.rotations[i] + 'deg',
      // });
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
      [photos[currentIndex], photos[randomIndex]] = [photos[randomIndex], photos[currentIndex]];
    }
    return photos;
  }
}
