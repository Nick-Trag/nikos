import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { geoJSON, map, Map, tileLayer } from 'leaflet';
import { countries, countryNames, flags } from "../countries";
import { NgOptimizedImage, UpperCasePipe } from "@angular/common";

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [
    NgOptimizedImage,
    UpperCasePipe
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

  ngAfterViewInit(): void {
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
    geoJSON(countries[0]).addTo(leafletMap); // Immediately add Greece to the map, without waiting
    let i = 1;
    const intervalID = setInterval(() => {
      geoJSON(countries[i]).addTo(leafletMap); // Medium resolution. I think I am going to prefer this
      this.flags.push(this.allFlags[i]);
      i++;
      if (i === countries.length) {
        clearInterval(intervalID);
      }
    }, (30 * 1000) / (countries.length - 1)); // Split the 30 seconds into equally sized chunks
  }
}
