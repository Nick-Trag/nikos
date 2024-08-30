import { Component, inject, OnInit } from '@angular/core';
import { Photo, photos } from "../photos";
import { NgOptimizedImage, NgStyle } from "@angular/common";
import { RoutedService } from "../routed.service";

@Component({
  selector: 'app-photography',
  standalone: true,
  imports: [
    NgStyle,
    NgOptimizedImage
  ],
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.scss'
})
export class PhotographyComponent implements OnInit {
  photos: Photo[] = this.shuffle(photos);
  styles: Record<string, string>[] = [];
  // TODO: routedService does not work properly. Find a way to delay the animations here
  routedService = inject(RoutedService);
  protected isFirstLoadedPage = this.routedService.isFirstLoadedPage();

  ngOnInit(): void {
    const delay = this.isFirstLoadedPage ? 500 : 100;
    for (let i = 0; i < this.photos.length; i++) {
      let rotation = Math.random() * 70 - 35; // Rotations from -35deg to 35deg

      // Polaroids look bad if they are too straight, so enforce a 15-degree rotation minimum
      if (rotation > 0 && rotation < 15) {
        rotation = 15;
      }
      else if (rotation <= 0 && rotation > -15) {
        rotation = -15;
      }

      const translationX = Math.random() * 100 - 50; // Translations from -50px to 50px
      const translationY = Math.random() * 100 - 50;
      const zIndex = Math.floor(Math.random() * 20) + 1; // z-indices from 1 to 20

      setTimeout(() => {
        this.styles.push({
          'scale': '1',
          'z-index': zIndex.toString(),
          'translate': translationX + 'px ' + translationY + 'px',
          'rotate': rotation + 'deg',
        });
      }, delay); // Not the cleanest solution, but I could not find a better one. If I don't put this in a setTimeout, the styles are applied immediately, so no transition occurs
      // I'm also adding a small delay of 100ms, to give time for the mobile navbar to get out of the way and not hide the transitions
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
