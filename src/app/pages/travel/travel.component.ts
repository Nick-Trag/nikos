import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { geoJSON, Layer, LeafletMouseEvent, map, Map, PathOptions, tileLayer } from 'leaflet';
import { countries, countryNames, flags } from "../../constants/countries";
import { NgOptimizedImage } from "@angular/common";
import { Feature } from "geojson";

// Default style for the country outlines
const defaultStyle: PathOptions = {
  weight: 2,
  color: '#1865a1',
};
// Style for hovered countries
const hoveredStyle: PathOptions = {
  weight: 3,
  color: '#0a2d43',
  fillOpacity: 0.5,
};

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
    style: defaultStyle,
    onEachFeature: (feature, layer) => this.onEachFeature(feature, layer), // Arrow function, to not mess up the 'this' context
  });
  private geoJSONItems: any[] = []; // Have to declare it as 'any', becase Leaflet does not have proper signatures, so functions like setStyle cannot be found otherwise

  ngAfterViewInit(): void {
    const runwayWidth = this.runwayElement.nativeElement.offsetWidth;
    setTimeout(() => {
      this.planeTranslation = runwayWidth - 40;
    }); // Avoids ExpressionChangedAfterItHasBeenCheckedError

    const leafletMap: Map = this.initMap();

    this.addCountriesToMap(leafletMap);
  }

  // Initialize the map and add the first tile layer. Returns the reference to the new map
  initMap(): Map {
    const leafletMap: Map = map(this.mapElement.nativeElement, {
      worldCopyJump: true,
    }).setView([47, 14], 3);

    leafletMap.attributionControl.setPrefix('<a href="https://leafletjs.com/" target="_blank"' +
      ' title="A JavaScript library for interactive maps">Leaflet</a>');
    // leafletMap.attributionControl.setPrefix(false); // Completely hides/disables the 'Leaflet' attribution

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 2,
      maxZoom: 11,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
    }).addTo(leafletMap);

    // Stadia Maps: looks really good, is dark-mode by default, but has usage limits (generous, but still...)
    // tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    //   minZoom: 2,
    //   maxZoom: 11,
    //   attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    // })

    return leafletMap;
  }

  // Adds a GeoJSON layer to the map and schedules the addition of all countries to it
  addCountriesToMap(leafletMap: Map): void {
    this.geoJSONLayer.addTo(leafletMap);

    countries[0].properties!['index'] = 0; // Manually save the index of every country in its properties, for better interconnectivity with the flag icons

    this.geoJSONLayer.addData(countries[0]); // Immediately add Greece to the map, without waiting
    this.preloadFlagIcon(1);

    let i = 1;
    const intervalID = setInterval(() => {
      countries[i].properties!['index'] = i;
      this.geoJSONLayer.addData(countries[i]);
      this.flags.push(this.allFlags[i]);

      i++;
      if (i === countries.length) {
        clearInterval(intervalID);
        this.animationFinished = true;
      } else {
        this.preloadFlagIcon(i);
      }
    }, (30 * 1000) / (countries.length - 1)); // Split the 30 seconds into equally sized chunks
  }

  // Used for preloading the flag icons before they are needed, to ensure they are ready in time
  preloadFlagIcon(i: number): void {
    const image = new Image();
    image.src = 'flags/1x1/' + this.allFlags[i];
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
    this.geoJSONItems.push(layer);
  }

  highlightFeature(event: LeafletMouseEvent): void {
    const layer: any = event.target; // Leaflet does not declare a type for this, so it has to be 'any'

    layer.setStyle(hoveredStyle);

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

  flagHovered(index: number) {
    this.geoJSONItems[index].setStyle(hoveredStyle);
    this.geoJSONItems[index].bringToFront();
  }

  flagUnhovered(index: number) {
    this.geoJSONLayer.resetStyle(this.geoJSONItems[index]);
  }
}
