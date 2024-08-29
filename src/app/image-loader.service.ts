import { Injectable } from '@angular/core';
import { Photo, photos } from "./photos";

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  constructor() {

  }

  // TODO: Test this on slow connections
  loadImages() {
    photos.forEach((photo: Photo) => {
      const image = new Image();
      image.src = `photos/medium/compressed/${photo.name}`;
    });
  }
}
