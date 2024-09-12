import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { GeoJSON, geoJSON, map, Map, tileLayer } from 'leaflet';
import { countries, countryNames, flags } from "../countries";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss'
})
export class TravelComponent implements AfterViewInit {
  protected readonly allFlags = flags;
  protected readonly countryNames = countryNames;
  protected flags = [this.allFlags[0]]; // Start by only including Greece's flag under the map
  @ViewChild('map')
  private mapElement!: ElementRef<HTMLElement>;
  @ViewChild('runway')
  private runwayElement!: ElementRef<HTMLElement>;
  protected planeTranslation = 0;
  protected animationFinished = false;
  private geoJSONs: GeoJSON[] = [];

  ngAfterViewInit(): void {
    const runwayWidth = this.runwayElement.nativeElement.offsetWidth;
    setTimeout(() => {
      this.planeTranslation = runwayWidth - 40;
    }); // Avoids ExpressionChangedAfterItHasBeenCheckedError

    const leafletMap: Map = map(this.mapElement.nativeElement).setView([49, 14], 3);

    leafletMap.attributionControl.setPrefix('<a href="https://leafletjs.com/" target="_blank"' +
      ' title="A JavaScript library for interactive maps">Leaflet</a>');
    // leafletMap.attributionControl.setPrefix(false); // Completely hides/disables the 'Leaflet' attribution

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 2,
      maxZoom: 11,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
    }).addTo(leafletMap);
    // TODO: Paint/overlay visited countries, based on when I visited them, and show a timeline

    // TODO: Works, but it's probably too heavy. Should find a lighter GeoJSON representation of countries
    this.geoJSONs.push(geoJSON(countries[0]));
    this.geoJSONs[0].addTo(leafletMap); // Immediately add Greece to the map, without waiting
    let i = 1;
    const intervalID = setInterval(() => {
      this.geoJSONs.push(geoJSON(countries[i]));
      this.geoJSONs[i].addTo(leafletMap); // Medium resolution. I think I am going to prefer this
      this.flags.push(this.allFlags[i]);
      i++;
      if (i === countries.length) {
        clearInterval(intervalID);
        this.animationFinished = true;
      }
    }, (30 * 1000) / (countries.length - 1)); // Split the 30 seconds into equally sized chunks
  }

  @HostListener('window:resize')
  onResize(): void {
    const runwayWidth = this.runwayElement.nativeElement.offsetWidth;
    this.planeTranslation = runwayWidth - 40;
  }
}
