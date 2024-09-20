import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Photo, photos } from "../photos";
import { NgOptimizedImage, NgStyle } from "@angular/common";
import { LoadingScreenService } from "../loading-screen.service";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-photography',
  standalone: true,
  imports: [
    NgStyle,
    NgOptimizedImage,
  ],
  templateUrl: './photography.component.html',
  styleUrl: './photography.component.scss',
  animations: [
    trigger('modal', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.15s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.15s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class PhotographyComponent implements OnInit {
  photos: Photo[] = this.shuffle(photos);
  styles: Record<string, string>[] = [];
  private loadingScreenService = inject(LoadingScreenService);
  protected loadingScreenShown = this.loadingScreenService.hasLoadingScreenBeenShown();
  modalOpen: boolean = false;
  currentImageIndex = 0;
  @ViewChild('modal')
  private modal!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    const delay = this.loadingScreenShown ? 100 : 500;
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

  openModal(event: MouseEvent, index: number) {
    event.preventDefault();
    this.modalOpen = true;
    this.currentImageIndex = index;
  }

  closeModal() {
    this.modalOpen = false;
  }

  modalClicked(event: MouseEvent) {
    // Checks if the clicked area was actually the gutter, or an element inside the modal, in which case the modal should not be closed
    if (event.target === this.modal.nativeElement) {
      this.modalOpen = false;
    }
  }

  modalKeyPressed(event: KeyboardEvent) {
    if (!this.modalOpen) {
      return;
    }

    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        if (this.currentImageIndex > 0) {
          this.currentImageIndex--;
        }
        break;
      case 'ArrowRight':
        if (this.currentImageIndex < this.photos.length - 1) {
          this.currentImageIndex++;
        }
        break;
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
