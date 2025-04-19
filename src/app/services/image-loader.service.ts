import { Injectable } from '@angular/core';
import { Photo, photos } from "../constants/photos";

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  constructor() {

  }

  loadImages() {
    photos.forEach((photo: Photo) => {
      const image = new Image();
      image.src = `photos/medium/compressed/${photo.name}`;
    });
  }
}
