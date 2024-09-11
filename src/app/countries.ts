// TODO: Serve the countries a JSON files from a server, when needed, instead of saving them all here

// Imports all the individual country files and exports them as an array
import { greece } from './countries/greece';
import { italy } from "./countries/italy";
import { vatican } from "./countries/vatican";
import { turkey } from "./countries/turkey";
import { uk } from "./countries/uk";
import { france } from "./countries/france";
import { switzerland } from "./countries/switzerland";
import { sweden } from "./countries/sweden";
import { norway } from "./countries/norway";
import { denmark } from "./countries/denmark";
import { belgium } from "./countries/belgium";
import { netherlands } from "./countries/netherlands";
import { hungary } from "./countries/hungary";
import { austria } from "./countries/austria";
import { spain } from "./countries/spain";
import { liechtenstein } from "./countries/liechtenstein";
import { portugal } from "./countries/portugal";
import { gibraltar } from "./countries/gibraltar";
import { andorra } from "./countries/andorra";
import { slovakia } from "./countries/slovakia";
import { malta } from "./countries/malta";
import { croatia } from "./countries/croatia";
import { bosnia } from "./countries/bosnia-herzegovina";
import { israel } from "./countries/israel";
import { germany } from "./countries/germany";
import { poland } from "./countries/poland";
import { romania } from "./countries/romania";
import { bulgaria } from "./countries/bulgaria";
import { albania } from "./countries/albania";

export const countries: GeoJSON.GeoJSON[] = [
  greece,
  italy,
  vatican,
  turkey,
  uk,
  france,
  switzerland,
  sweden,
  norway,
  denmark,
  belgium,
  netherlands,
  hungary,
  austria,
  spain,
  liechtenstein,
  portugal,
  gibraltar,
  andorra,
  slovakia,
  malta,
  croatia,
  bosnia,
  israel,
  germany,
  poland,
  romania,
  bulgaria,
  albania,
];

export const flags: string[] = [
  'gr.svg',
  'it.svg',
  'va.svg',
  'tr.svg',
  'gb.svg',
  'fr.svg',
  'ch.svg',
  'se.svg',
  'no.svg',
  'dk.svg',
  'be.svg',
  'nl.svg',
  'hu.svg',
  'at.svg',
  'es.svg',
  'li.svg',
  'pt.svg',
  'gi.svg',
  'ad.svg',
  'sk.svg',
  'mt.svg',
  'hr.svg',
  'ba.svg',
  'il.svg',
  'de.svg',
  'pl.svg',
  'ro.svg',
  'bg.svg',
  'al.svg',
];

export const countryNames: string[] = [
  'Greece',
  'Italy',
  'Vatican City',
  'Turkey',
  'United Kingdom',
  'France',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Belgium',
  'Netherlands',
  'Hungary',
  'Austria',
  'Spain',
  'Liechtenstein',
  'Portugal',
  'Gibraltar',
  'Andorra',
  'Slovakia',
  'Malta',
  'Croatia',
  'Bosnia and Herzegovina',
  'Israel',
  'Germany',
  'Poland',
  'Romania',
  'Bulgaria',
  'Albania',
];
