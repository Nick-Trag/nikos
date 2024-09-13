import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { geoJSON, Layer, LeafletMouseEvent, map, Map, tileLayer } from 'leaflet';
import { countries, countryNames, flags } from "../countries";
import { NgOptimizedImage } from "@angular/common";
import { Feature } from "geojson";

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
  protected hoveredFlags = Array(this.allFlags.length).fill(false);

  @ViewChild('map')
  private mapElement!: ElementRef<HTMLElement>;
  @ViewChild('runway')
  private runwayElement!: ElementRef<HTMLElement>;

  protected planeTranslation = 0;
  protected animationFinished = false;
  private geoJSONLayer = geoJSON(null, {
    style: {
      weight: 2,
      // color: 'red',
      // opacity: 0.6,
    },
    onEachFeature: (feature, layer) => this.onEachFeature(feature, layer), // Arrow function, to not mess up the 'this' context
  });

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
    this.geoJSONLayer.addTo(leafletMap);
    countries[0].properties!['index'] = 0; // Manually save the index of every country in its properties, for better interconnectivity with the flag icons
    this.geoJSONLayer.addData(countries[0]); // Immediately add Greece to the map, without waiting
    let i = 1;
    const intervalID = setInterval(() => {
      countries[i].properties!['index'] = i;
      this.geoJSONLayer.addData(countries[i]);
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

  onEachFeature(feature: Feature, layer: Layer): void {
    layer.on({
      mouseover: this.highlightFeature.bind(this),
      mouseout: this.resetHighlight.bind(this),
    }); // bind(this) is needed, because the 'this' context can get messed up without it
  }

  highlightFeature(event: LeafletMouseEvent): void {
    const layer: any = event.target; // Leaflet does not declare a type for this, so it has to be 'any'

    layer.setStyle({
      weight: 3,
      color: 'darkblue',
    });

    layer.bringToFront();

    const index: number = layer.feature.properties['index'];
    this.hoveredFlags[index] = true;
  }

  resetHighlight(event: LeafletMouseEvent): void {
    const layer = event.target;

    this.geoJSONLayer.resetStyle(layer);

    const index: number = layer.feature.properties['index'];
    this.hoveredFlags[index] = false;
  }

  // TODO: Style the countries on the map correctly
  flagHovered(index: number) {
    console.log('Hovered ' + index);
  }

  flagUnhovered(index: number) {
    console.log('Unhovered ' + index);
  }
}
