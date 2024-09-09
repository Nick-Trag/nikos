import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { geoJSON, map, Map, tileLayer } from 'leaflet';
import { greece } from "../countries";

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.scss'
})
export class TravelComponent implements AfterViewInit {
  @ViewChild('map')
  private mapElement!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    const leafletMap: Map = map(this.mapElement.nativeElement).setView([49, 14], 4);

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(leafletMap);
    // TODO: Paint/overlay visited countries, based on when I visited them, and show a timeline

    // TODO: Works, but it's probably too heavy. Should find a lighter GeoJSON representation of countries
    geoJSON(greece).addTo(leafletMap);
  }
}
